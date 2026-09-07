const SITE_URL = "https://schoolkit.ng";
const LOGO_URL = `${SITE_URL}/favicon.png`;
const DEMO_URL = "https://www.schoolkit.ng/demo";

const COLORS = {
  ink: "#13262e",
  emerald: "#0e5c43",
  emeraldBright: "#3fb68b",
  paper: "#f7f5ef",
  footerBg: "#f1efe6",
  text: "#16211c",
  muted: "#5d6b63",
  line: "#e5e1d4",
};

/**
 * Resend merge tags. They are only interpolated on broadcasts, so a direct
 * /emails test send has to substitute them first — hence the `preview` flag.
 */
const TAGS = {
  firstName: "{{{FIRST_NAME|there}}}",
  unsubscribe: "{{{RESEND_UNSUBSCRIBE_URL}}}",
};

const PREVIEW_VALUES = {
  firstName: "there",
  unsubscribe: `${SITE_URL}/#join`,
};

interface Step {
  emoji: string;
  title: string;
}

const STEPS: Step[] = [
  { emoji: "&#127979;", title: "Create your school" },
  { emoji: "&#128197;", title: "Set up the academic year" },
  { emoji: "&#128101;", title: "Add students" },
  { emoji: "&#9993;&#65039;", title: "Invite staff" },
];

function stepRow({ emoji, title }: Step): string {
  return `
  <tr>
    <td width="34" valign="top" style="padding:0 12px 14px 0;font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:1.3;">${emoji}</td>
    <td valign="top" style="padding:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;font-weight:700;color:${COLORS.ink};">${title}</td>
  </tr>`;
}

export function getDemoEmailSubject(): string {
  return "See how easy it is to set up your school (2-min video)";
}

export function getDemoEmailHtml({ preview = false } = {}): string {
  const firstName = preview ? PREVIEW_VALUES.firstName : TAGS.firstName;
  const unsubscribe = preview ? PREVIEW_VALUES.unsubscribe : TAGS.unsubscribe;

  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${getDemoEmailSubject()}</title>
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
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">A 2-minute walkthrough: create your school, set up the academic year, add students and invite staff.</div>
<center style="width:100%;background:${COLORS.paper};">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${COLORS.paper};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="email-container" style="width:600px;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">

        <!-- header -->
        <tr>
          <td class="header-pad" style="background:${COLORS.ink};background:linear-gradient(135deg, ${COLORS.ink} 0%, ${COLORS.emerald} 100%);padding:40px 40px 32px;text-align:center;">
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
            <p class="h1" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:700;color:${COLORS.ink};margin:0 0 20px;">Hi ${firstName},</p>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 24px;">We put together a short video showing exactly how to get your school running on SchoolKit &mdash; create your school, set up the academic year, add students, and invite staff.</p>

            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;margin:0 0 28px;">
              ${STEPS.map(stepRow).join("")}
            </table>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 20px;">&#128073; Watch it here:</p>

            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
              <tr>
                <td align="center" style="border-radius:10px;background:${COLORS.emerald};">
                  <a href="${DEMO_URL}" class="cta-btn" style="display:inline-block;padding:16px 32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;">Watch the 2-minute demo &rarr;</a>
                </td>
              </tr>
            </table>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:${COLORS.muted};margin:0 0 28px;">Or paste this into your browser: <a href="${DEMO_URL}" style="color:${COLORS.emerald};">${DEMO_URL}</a></p>

            <div style="border-top:1px solid ${COLORS.line};margin:0 0 28px;"></div>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 28px;">Questions after watching? Just reply to this email.</p>

            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
              <tr>
                <td valign="middle" style="padding-right:10px;">
                  <img src="${LOGO_URL}" width="32" height="32" alt="" style="display:block;border-radius:7px;">
                </td>
                <td valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4;">
                  <span style="display:block;color:${COLORS.muted};">&mdash;</span>
                  <span style="display:block;font-weight:700;color:${COLORS.ink};">SchoolKit Team</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- footer -->
        <tr>
          <td style="background:${COLORS.footerBg};padding:24px 40px;text-align:center;">
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${COLORS.muted};margin:0 0 6px;">&copy; 2026 SchoolKit. Built in Lagos, Nigeria &#127475;&#127468;</p>
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${COLORS.muted};margin:0 0 6px;">You are receiving this because you expressed interest in SchoolKit.</p>
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${COLORS.muted};margin:0;"><a href="${unsubscribe}" style="color:${COLORS.muted};text-decoration:underline;">Unsubscribe</a></p>
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

export function getDemoEmailText({ preview = false } = {}): string {
  const firstName = preview ? PREVIEW_VALUES.firstName : TAGS.firstName;
  const unsubscribe = preview ? PREVIEW_VALUES.unsubscribe : TAGS.unsubscribe;

  return `Hi ${firstName},

We put together a short video showing exactly how to get your school running on SchoolKit - create your school, set up the academic year, add students, and invite staff.

Watch it here: ${DEMO_URL}

Questions after watching? Just reply to this email.

- SchoolKit Team

(c) 2026 SchoolKit. Built in Lagos, Nigeria
You are receiving this because you expressed interest in SchoolKit.
Unsubscribe: ${unsubscribe}`;
}
