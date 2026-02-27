export const concepts = [
  {
    title: "Authentication Chains",
    description: "Sequence of auth modules executed in order",
    steps: [
      "User initiates login request",
      "ForgeRock AM evaluates auth chain",
      "Modules execute based on flags & conditions",
      "Success/failure determines next step",
      "Session created on successful completion"
    ]
  },
  {
    title: "Multi-Factor Authentication (MFA)",
    description: "Additional security layers beyond passwords",
    steps: [
      "Something you know (password)",
      "Something you have (phone, token)",
      "Something you are (biometrics)",
      "Contextual factors (location, device)",
      "Reduces risk of account compromise"
    ]
  },
  {
    title: "MFA Methods in ForgeRock",
    description: "Various MFA options supported",
    steps: [
      "SMS/Voice OTP - Codes sent to phone",
      "TOTP - Time-based codes (Google Auth)",
      "Push Notifications - Approve on mobile",
      "Hardware Tokens - FIDO2, YubiKey",
      "Biometrics - Fingerprint, face recognition"
    ]
  },
  {
    title: "Adaptive Authentication",
    description: "Smart auth based on risk assessment",
    steps: [
      "Analyze user behavior patterns",
      "Check device & location context",
      "Calculate risk score in real-time",
      "Adjust auth requirements dynamically",
      "Step-up auth for high-risk scenarios"
    ]
  },
  {
    title: "Step-up Authentication",
    description: "Additional auth for sensitive resources",
    steps: [
      "User accesses protected resource",
      "System evaluates resource sensitivity",
      "Triggers additional authentication",
      "User proves identity again",
      "Grants elevated session privileges"
    ]
  },
  {
    title: "Session & Token Management",
    description: "Managing authenticated sessions",
    steps: [
      "Create session tokens on auth success",
      "Store user attributes & permissions",
      "Handle session timeouts & renewal",
      "Support SSO across applications",
      "Secure logout & token cleanup"
    ]
  }
]
