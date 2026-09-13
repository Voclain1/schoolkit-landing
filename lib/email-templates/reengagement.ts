const SITE_URL = "https://schoolkit.ng";
const LOGO_URL = `${SITE_URL}/favicon.png`;
const LOGIN_URL = "https://app.schoolkit.ng/login";
const UNSUBSCRIBE_MAILTO = "mailto:hello@schoolkit.ng?subject=Unsubscribe";

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

export function getReengagementEmailSubject(): string {
  return "You're closer than you think — pick up where you left off";
}

/**
 * Sent one address at a time through POST /emails rather than as a broadcast,
 * so the school name is interpolated here instead of via a merge tag. Adding
 * these schools to an audience would fire contact.created and send them the
 * welcome email, which is exactly the wrong message for this group.
 */
export function getReengagementEmailHtml({ schoolName }: { schoolName: string }): string {
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${getReengagementEmailSubject()}</title>
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
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">Nothing is lost — log back in and pick up exactly where you left off.</div>
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
            <p class="h1" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:700;color:${COLORS.ink};margin:0 0 20px;">Hi ${schoolName} team,</p>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 20px;">We noticed your SchoolKit signup didn't quite finish &mdash; and we wanted to reach out personally.</p>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 20px;">We recently fixed an issue in the final setup step (the academic calendar) that may have caused a confusing error for some schools. If that's what happened to you, it's fixed now &mdash; and if it wasn't, no worries either way.</p>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 24px;"><b>Good news: nothing is lost.</b> Just log back in and you'll pick up exactly where you left off &mdash; no need to start over.</p>

            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
              <tr>
                <td align="center" style="border-radius:10px;background:${COLORS.emerald};">
                  <a href="${LOGIN_URL}" class="cta-btn" style="display:inline-block;padding:16px 32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;">Log back in &rarr;</a>
                </td>
              </tr>
            </table>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:${COLORS.muted};margin:0 0 28px;">Or paste this into your browser: <a href="${LOGIN_URL}" style="color:${COLORS.emerald};">${LOGIN_URL}</a></p>

            <div style="border-top:1px solid ${COLORS.line};margin:0 0 28px;"></div>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 20px;">If you run into anything at all, just reply to this email and I'll personally help you get sorted.</p>

            <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.text};margin:0 0 28px;">Looking forward to having your school live on SchoolKit.</p>

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
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${COLORS.muted};margin:0 0 6px;">You are receiving this because your school started a SchoolKit signup.</p>
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${COLORS.muted};margin:0;"><a href="${UNSUBSCRIBE_MAILTO}" style="color:${COLORS.muted};text-decoration:underline;">Unsubscribe</a></p>
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

export function getReengagementEmailText({ schoolName }: { schoolName: string }): string {
  return `Hi ${schoolName} team,

We noticed your SchoolKit signup didn't quite finish - and we wanted to reach out personally.

We recently fixed an issue in the final setup step (the academic calendar) that may have caused a confusing error for some schools. If that's what happened to you, it's fixed now - and if it wasn't, no worries either way.

Good news: nothing is lost. Just log back in and you'll pick up exactly where you left off - no need to start over.

Log back in: ${LOGIN_URL}

If you run into anything at all, just reply to this email and I'll personally help you get sorted.

Looking forward to having your school live on SchoolKit.

- SchoolKit Team

(c) 2026 SchoolKit. Built in Lagos, Nigeria
You are receiving this because your school started a SchoolKit signup.
To unsubscribe, reply to this email with "Unsubscribe" or write to hello@schoolkit.ng.`;
}
