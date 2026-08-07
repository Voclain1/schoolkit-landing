const SITE_URL = "https://schoolkit.ng";
const LOGO_URL = `${SITE_URL}/favicon.png`;

const COLORS = {
  ink: "#0c1712",
  inkAlt: "#13241c",
  emerald: "#0e5c43",
  emeraldBright: "#3fb68b",
  paper: "#f6f4ed",
  footerBg: "#f1efe6",
  text: "#16211c",
  muted: "#5d6b63",
  line: "#e5e1d4",
};

const CHECKLIST_ITEMS = [
  "Collect fees via Paystack — no more cash chaos",
  "Track attendance digitally",
  "Generate report cards in minutes",
  "Keep parents updated automatically",
  "Works 100% offline",
];

const NEXT_STEPS = [
  "Visit schoolkit.ng and join the early access waitlist",
  "We will reach out personally to schedule your onboarding",
  "Your school goes live — free for pioneer schools",
];

function checklistRow(text: string): string {
  return `
  <tr>
    <td width="28" valign="top" style="padding:0 12px 14px 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="24" height="24" style="width:24px;height:24px;">
        <tr>
          <td align="center" valign="middle" width="24" height="24" style="width:24px;height:24px;border-radius:50%;background:${COLORS.emeraldBright};font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:24px;color:#ffffff;">&#10003;</td>
        </tr>
      </table>
    </td>
    <td valign="middle" style="padding:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:${COLORS.text};">
      ${text}
    </td>
  </tr>`;
}

function stepRow(index: number, text: string): string {
  return `
  <tr>
    <td width="28" valign="top" style="padding:0 12px 16px 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="24" height="24" style="width:24px;height:24px;">
        <tr>
          <td align="center" valign="middle" width="24" height="24" style="width:24px;height:24px;border-radius:50%;background:${COLORS.ink};font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:12px;line-height:24px;color:#ffffff;">${index}</td>
        </tr>
      </table>
    </td>
    <td valign="middle" style="padding:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:${COLORS.text};">
      ${text}
    </td>
  </tr>`;
}

export interface WelcomeEmailProps {
  /** First name to greet the recipient with. Falls back to "there" upstream if unknown. */
  firstName: string;
}

export function getWelcomeEmailSubject(): string {
  return "Welcome to SchoolKit — here's what happens next";
}

export function getWelcomeEmailHtml({ firstName }: WelcomeEmailProps): string {
  const greetingName = escapeHtml(firstName);

  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${getWelcomeEmailSubject()}</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
  body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }
  a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
  @media screen and (max-width: 600px) {
    .email-container { width: 100% !important; border-radius: 0 !important; }
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .header-pad { padding: 32px 24px 26px !important; }
    .h1 { font-size: 21px !important; }
    .cta-btn { display: block !important; width: 100% !important; text-align: center !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${COLORS.paper};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">Thanks for joining the SchoolKit waitlist — here's what happens next.</div>
<center style="width:100%;background:${COLORS.paper};">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${COLORS.paper};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="email-container" style="width:600px;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">

        <!-- header -->
        <tr>
          <td class="header-pad" style="background:${COLORS.inkAlt};background:linear-gradient(135deg, ${COLORS.inkAlt} 0%, ${COLORS.emerald} 100%);padding:40px 40px 32px;text-align:center;">
            <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 16px;">
              <tr>
                <td valign="middle" style="padding-right:10px;">
                  <img src="${LOGO_URL}" width="40" height="40" alt="SchoolKit" style="display:block;border-radius:9px;">
                </td>
                <td valign="middle">
                  <span style="font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;color:#ffffff;">school<span style="color:${COLORS.emeraldBright};">kit</span></span>
                </td>
              </tr>
            </table>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#cdd9d2;">The school management platform built for Nigeria</div>
          </td>
        </tr>

        <!-- body -->
        <tr>
          <td class="px" style="padding:40px 40px 8px;">
            <p class="h1" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:700;color:${COLORS.ink};margin:0 0 20px;">Hi ${greetingName},</p>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 12px;">Thank you for your interest in SchoolKit.</p>
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 28px;">You are joining a growing list of Nigerian school owners who are tired of managing their schools on notebooks and spreadsheets.</p>

            <p style="font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:700;color:${COLORS.emerald};margin:0 0 16px;">Here is what SchoolKit does for your school:</p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 4px;">
              ${CHECKLIST_ITEMS.map(checklistRow).join("")}
            </table>

            <div style="border-top:1px solid ${COLORS.line};margin:24px 0 28px;"></div>

            <p style="font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:700;color:${COLORS.emerald};margin:0 0 16px;">Here is what happens next:</p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 4px;">
              ${NEXT_STEPS.map((text, i) => stepRow(i + 1, text)).join("")}
            </table>

            <div style="border-top:1px solid ${COLORS.line};margin:24px 0 28px;"></div>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 20px;">Any questions? Reply to this email or chat us on WhatsApp — we respond within 24 hours.</p>
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 24px;">Looking forward to working with you,</p>

            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
              <tr>
                <td valign="middle" style="padding-right:10px;">
                  <img src="${LOGO_URL}" width="32" height="32" alt="" style="display:block;border-radius:7px;">
                </td>
                <td valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4;">
                  <span style="display:block;font-weight:700;color:${COLORS.ink};">The SchoolKit Team</span>
                  <span style="display:block;color:${COLORS.muted};">schoolkit.ng</span>
                </td>
              </tr>
            </table>

            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
              <tr>
                <td align="center" style="border-radius:10px;background:${COLORS.emerald};">
                  <a href="${SITE_URL}" class="cta-btn" style="display:inline-block;padding:16px 32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;">Visit schoolkit.ng &rarr;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- footer -->
        <tr>
          <td style="background:${COLORS.footerBg};padding:24px 40px;text-align:center;">
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${COLORS.muted};margin:0 0 6px;">&copy; 2026 SchoolKit. Built in Lagos, Nigeria &#127475;&#127462;</p>
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${COLORS.muted};margin:0;">You are receiving this because you expressed interest in SchoolKit.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</center>
</body>
</html>`;
}

export function getWelcomeEmailText({ firstName }: WelcomeEmailProps): string {
  return `Hi ${firstName},

Thank you for your interest in SchoolKit.
You are joining a growing list of Nigerian school owners who are tired of managing their schools on notebooks and spreadsheets.

Here is what SchoolKit does for your school:
${CHECKLIST_ITEMS.map((item) => `- ${item}`).join("\n")}

Here is what happens next:
${NEXT_STEPS.map((item, i) => `${i + 1}. ${item}`).join("\n")}

Any questions? Reply to this email or chat us on WhatsApp — we respond within 24 hours.

Looking forward to working with you,
The SchoolKit Team
schoolkit.ng

Visit schoolkit.ng: ${SITE_URL}

© 2026 SchoolKit. Built in Lagos, Nigeria
You are receiving this because you expressed interest in SchoolKit.`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
