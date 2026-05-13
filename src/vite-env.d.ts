interface ImportMetaEnv {
  readonly VITE_EMAILJS_PUBLIC_KEY?: string
  readonly VITE_EMAILJS_SERVICE_ID?: string
  readonly VITE_EMAILJS_TEMPLATE_ID?: string
  /** Non-default EmailJS API origin only if documented (default: https://api.emailjs.com) */
  readonly VITE_EMAILJS_API_ORIGIN?: string
}
