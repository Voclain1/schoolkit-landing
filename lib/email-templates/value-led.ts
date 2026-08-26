const SITE_URL = "https://schoolkit.ng";
const LOGO_URL = `${SITE_URL}/favicon.png`;
const APP_URL = "https://app.schoolkit.ng";

const COLORS = {
  ink: "#0c1712",
  inkAlt: "#13241c",
  emerald: "#0e5c43",
  emeraldBright: "#3fb68b",
  gold: "#e0a52e",
  goldSoft: "#fdf6e6",
  paper: "#f6f4ed",
  footerBg: "#f1efe6",
  text: "#16211c",
  muted: "#5d6b63",
  line: "#e5e1d4",
};

interface Feature {
  emoji: string;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    emoji: "&#128176;",
    title: "Fee collection made easy",
    body: "Parents pay online via Paystack &mdash; no more chasing payments.",
  },
  {
    emoji: "&#128203;",
    title: "Attendance &amp; digital report cards",
    body: "No more paper registers or manual grading headaches.",
  },
  {
    emoji: "&#128172;",
    title: "Parent communication",
    body: "Keep guardians in the loop automatically.",
  },
  {
    emoji: "&#129302;",
    title: "AI-powered lesson plans &amp; report card comments",
    body: "Save hours every term.",
  },
  {
    emoji: "&#128105;&#8205;&#127979;",
    title: "Staff management",
    body: "One dashboard for your whole team.",
  },
];

function featureRow({ emoji, title, body }: Feature): string {
  return `
  <tr>
    <td width="34" valign="top" style="padding:0 12px 18px 0;font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:1.3;">${emoji}</td>
    <td valign="top" style="padding:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:${COLORS.text};">
      <span style="display:block;font-weight:700;color:${COLORS.ink};">${title}</span>
      <span style="display:block;color:${COLORS.muted};">${body}</span>
    </td>
  </tr>`;
}

export function getValueLedEmailSubject(): string {
  return "Here's what SchoolKit does for your school (2 min read)";
}

export function getValueLedEmailHtml(): string {
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${getValueLedEmailSubject()}</title>
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
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">Fees, attendance, report cards, parent messages and AI lesson plans &mdash; here's what your school gets from day one.</div>
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
            <p class="h1" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:700;color:${COLORS.ink};margin:0 0 20px;">Hi there,</p>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 28px;">Thanks for your interest in SchoolKit! I wanted to share a quick look at what your school gets from day one:</p>

            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;margin:0 0 12px;">
              ${FEATURES.map(featureRow).join("")}
            </table>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 28px;">Schools are already using SchoolKit to save hours every week.</p>

            <!-- scarcity block (Gold Spark) -->
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;margin:0 0 28px;border-radius:14px;background:${COLORS.goldSoft};">
              <tr>
                <td style="padding:24px 26px;border-radius:14px;border-left:4px solid ${COLORS.gold};background:${COLORS.goldSoft};">
                  <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${COLORS.gold};margin:0 0 8px;">Founding schools offer</p>
                  <p style="font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;line-height:1.45;color:${COLORS.ink};margin:0;">The first 100 schools to join get <span style="color:${COLORS.gold};">2 free terms</span> &mdash; plus a locked-in price for life.</p>
                </td>
              </tr>
            </table>

            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
              <tr>
                <td align="center" style="border-radius:10px;background:${COLORS.emerald};">
                  <a href="${APP_URL}" class="cta-btn" style="display:inline-block;padding:16px 32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;">See it for yourself &rarr;</a>
                </td>
              </tr>
            </table>

            <div style="border-top:1px solid ${COLORS.line};margin:0 0 28px;"></div>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 28px;">Happy to hop on a quick call if you'd like a walkthrough first &mdash; just reply to this email.</p>

            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
              <tr>
                <td valign="middle" style="padding-right:10px;">
                  <img src="${LOGO_URL}" width="32" height="32" alt="" style="display:block;border-radius:7px;">
                </td>
                <td valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4;">
                  <span style="display:block;color:${COLORS.muted};">Best Regards,</span>
                  <span style="display:block;font-weight:700;color:${COLORS.ink};">Your SchoolKit Team</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- footer -->
        <tr>
          <td style="background:${COLORS.footerBg};padding:24px 40px;text-align:center;">
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${COLORS.muted};margin:0 0 6px;">&copy; 2026 SchoolKit. Built in Lagos, Nigeria &#127475;&#127468;</p>
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

export function getValueLedEmailText(): string {
  return `Hi there,

Thanks for your interest in SchoolKit! I wanted to share a quick look at what your school gets from day one:

- Fee collection made easy - parents pay online via Paystack, no more chasing payments
- Attendance & digital report cards - no more paper registers or manual grading headaches
- Parent communication - keep guardians in the loop automatically
- AI-powered lesson plans & report card comments - save hours every term
- Staff management - one dashboard for your whole team

Schools are already using SchoolKit to save hours every week.

And right now, the first 100 schools to join get 2 free terms + a locked-in price for life.

See it for yourself: ${APP_URL}

Happy to hop on a quick call if you'd like a walkthrough first - just reply to this email.

Best Regards,
Your SchoolKit Team

© 2026 SchoolKit. Built in Lagos, Nigeria
You are receiving this because you expressed interest in SchoolKit.`;
}
