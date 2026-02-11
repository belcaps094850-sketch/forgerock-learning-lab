# 🔐 ForgeRock Learning Lab

An interactive React-based educational tool for learning ForgeRock Identity & Access Management concepts.

## 📚 Features

- **Interactive Authentication Chains** - Visualize how ForgeRock authentication flows work
- **Multiple MFA Methods** - SMS, TOTP, and adaptive authentication scenarios
- **Risk-based Authentication** - See how context affects authentication requirements
- **Step-up Authentication** - Additional security for sensitive operations
- **Real-time Simulation** - Watch authentication modules execute in sequence

## 🎮 Authentication Types

### 📱 **SMS MFA**
- Primary username/password authentication
- SMS verification code challenge
- Session creation on success

### 🔐 **TOTP MFA**
- Time-based One-Time Passwords (like Google Authenticator)
- Backup recovery codes support
- Device trust options

### 🧠 **Adaptive Authentication**
- Real-time risk scoring based on context
- Conditional MFA requirements
- Location and device-based decisions

### 🔺 **Step-up Authentication**
- Additional authentication for privileged operations
- Elevated session management

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd forgerock-learning
   ```

2. **Start a local web server**
   ```bash
   python3 -m http.server 8091
   # or
   npx serve .
   ```

3. **Open your browser**
   ```
   http://localhost:8091
   ```

## 💡 Demo Credentials

- **Username:** `demo` (or try `admin`, `suspicious`)
- **Password:** `demo123`
- **SMS Code:** `123456`
- **TOTP Code:** Any 6-digit number
- **Backup Code:** `backup123`

## 📖 Learning Guide

1. **Start with Concepts** - Understand ForgeRock fundamentals
2. **Try Basic Auth** - See simple username/password flows
3. **Experiment with MFA** - Learn multi-factor authentication
4. **Test Risk Scenarios** - Use "suspicious" username or "Unknown Location"
5. **Explore Step-up** - Try "admin" username for privileged access

## 🔧 Technology Stack

- **React 18** - UI framework
- **Vanilla JavaScript** - No build process required
- **CSS3** - Modern styling with gradients and animations
- **HTML5** - Semantic structure

## 🎯 Educational Objectives

- Understand ForgeRock authentication chains and module execution
- Learn about different MFA methods and their implementation
- Explore adaptive/risk-based authentication concepts
- See how step-up authentication works for privileged operations
- Visualize the flow of authentication decisions

## 🔍 Key Concepts Covered

- **Authentication Chains** - Sequential module execution
- **Module Flags** - REQUIRED, OPTIONAL, SUFFICIENT, CONDITIONAL
- **Multi-Factor Authentication** - Something you know/have/are
- **Risk Assessment** - Context-based authentication decisions
- **Session Management** - Token creation and lifecycle
- **Access Policies** - Resource protection strategies

## 📄 License

MIT License - Feel free to use this for educational purposes!

---

**Note:** This is a simulation for educational purposes. ForgeRock was acquired by Ping Identity in 2023, and real implementations should follow current best practices and official documentation.