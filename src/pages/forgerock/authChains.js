export const authChains = {
  basic: [
    { name: "Username/Password", type: "REQUIRED", status: "pending", description: "Primary authentication" },
    { name: "Account Status", type: "REQUIRED", status: "pending", description: "Check if account is active" },
    { name: "Policy Validation", type: "REQUIRED", status: "pending", description: "Apply security policies" }
  ],
  sms_mfa: [
    { name: "Primary Auth", type: "REQUIRED", status: "pending", description: "Username & password validation" },
    { name: "SMS Challenge", type: "REQUIRED", status: "pending", description: "Send SMS verification code" },
    { name: "Code Verification", type: "REQUIRED", status: "pending", description: "Validate SMS code" },
    { name: "Session Creation", type: "REQUIRED", status: "pending", description: "Create authenticated session" }
  ],
  totp_mfa: [
    { name: "Primary Auth", type: "REQUIRED", status: "pending", description: "Username & password validation" },
    { name: "TOTP Challenge", type: "REQUIRED", status: "pending", description: "Time-based OTP from authenticator app" },
    { name: "Backup Code Check", type: "OPTIONAL", status: "pending", description: "Allow backup recovery codes" },
    { name: "Device Registration", type: "OPTIONAL", status: "pending", description: "Remember trusted device" }
  ],
  adaptive: [
    { name: "Identity Check", type: "REQUIRED", status: "pending", description: "Verify user credentials" },
    { name: "Risk Assessment", type: "REQUIRED", status: "pending", description: "Analyze login context" },
    { name: "Conditional MFA", type: "CONDITIONAL", status: "pending", description: "Require MFA if high risk" },
    { name: "Device Trust", type: "OPTIONAL", status: "pending", description: "Check device reputation" },
    { name: "Geolocation", type: "OPTIONAL", status: "pending", description: "Verify login location" },
    { name: "Final Authorization", type: "REQUIRED", status: "pending", description: "Grant or deny access" }
  ],
  step_up: [
    { name: "Basic Auth", type: "REQUIRED", status: "pending", description: "Standard login" },
    { name: "Resource Request", type: "REQUIRED", status: "pending", description: "User requests sensitive resource" },
    { name: "Step-up Trigger", type: "CONDITIONAL", status: "pending", description: "Determine if additional auth needed" },
    { name: "Additional MFA", type: "REQUIRED", status: "pending", description: "Biometric or hardware token" },
    { name: "Elevated Session", type: "REQUIRED", status: "pending", description: "Create privileged session" }
  ]
}
