
<div align="center">
  <p align="center">
    <img width="234" src="docs/media/logo-full.png" alt="WardenClyffe logo"/>
  </p>
  <p align="center">
    <a href="https://sonarcloud.io/dashboard?id=shippin_wardenclyffe">
      <img src="https://sonarcloud.io/api/project_badges/measure?project=shippin_wardenclyffe&metric=alert_status" alt="SonarCloud alert status"/>
    </a>
    <a href="https://github.com/shippin/wardenclyffe/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-BSD--3-blue" alt="BSD-3 License"/>
    </a>
    <a href="https://docs.wardenclyffe.app/slack-url">
      <img src="https://img.shields.io/badge/slack-@wardenclyffe-red.svg?logo=slack" alt="WardenClyffe Slack"/>
    </a>
    <a href="https://forum.wardenclyffe.app">
      <img src="https://img.shields.io/badge/community%20forum-@wardenclyffe-red.svg?logo=discourse" alt="Community forum"/>
    </a>
    <a href="https://gurubase.io/g/wardenclyffe">
      <img src="https://img.shields.io/badge/Gurubase-Ask%20WardenClyffe%20Guru-006BFF" alt="Gurubase: Ask WardenClyffe Guru"/>
    </a>
  </p>
</div>

<p align="center">
  <strong>
    Start using WardenClyffe at <a href="https://wardenclyffe.apppricing">wardenclyffe.app</a>
    <br/>
    See <a href="https://docs.wardenclyffe.app/">Documentation</a>
    <br/>
    Join our <a href="https://docs.wardenclyffe.app/slack-url">Slack channel</a> or our <a href="https://forum.wardenclyffe.app">Community forum</a>
  </strong>
  <br/>
  <br/>
  <strong>
    🚀 <a href="https://wardenclyffe.appcareers">We are hiring! Join us at https://wardenclyffe.appcareers</a>
  </strong>
</p>

> ### 🤖 WardenClyffe Agent Network (Beta)
> Identity-aware access control for AI agents — keyless access to LLM APIs and private
> resources over the encrypted WardenClyffe tunnel. See [`agent-network/`](agent-network/) or
> read the docs at **[wardenclyffe.ai](https://wardenclyffe.ai)**.

**WardenClyffe combines a configuration-free peer-to-peer private network and a centralized access control system in a single platform, making it easy to create secure private networks for your organization or home.**

**Connect.** WardenClyffe creates a WireGuard-based overlay network that automatically connects your machines over an encrypted tunnel, leaving behind the hassle of opening ports, complex firewall rules, VPN gateways, and so forth.

**Secure.** WardenClyffe enables secure remote access by applying granular access policies while allowing you to manage them intuitively from a single place. Works universally on any infrastructure.

https://github.com/user-attachments/assets/10cec749-bb56-4ab3-97af-4e38850108d2

### Self-host WardenClyffe (video)

[![Watch the video](https://img.youtube.com/vi/bZAgpT6nzaQ/0.jpg)](https://youtu.be/bZAgpT6nzaQ)

### Key features

| Connectivity | Management | Security | Automation | Platforms |
|---|---|---|---|---|
| ✓ [Kernel WireGuard](https://docs.wardenclyffe.app/about-wardenclyffe/why-wireguard-with-wardenclyffe) | ✓ [Admin Web UI](https://github.com/shippin/wardenclyffe/dashboard) | ✓ [SSO & MFA support](https://docs.wardenclyffe.app/how-to/installation#running-net-bird-with-sso-login) | ✓ [Public API](https://docs.wardenclyffe.app/api) | ✓ [Linux](https://docs.wardenclyffe.app/get-started/install/linux) |
| ✓ [Peer-to-peer connections](https://docs.wardenclyffe.app/about-wardenclyffe/how-wardenclyffe-works) | ✓ Auto peer discovery and configuration | ✓ [Access control: groups & rules](https://docs.wardenclyffe.app/how-to/manage-network-access) | ✓ [Setup keys for bulk provisioning](https://docs.wardenclyffe.app/how-to/register-machines-using-setup-keys) | ✓ [macOS](https://docs.wardenclyffe.app/get-started/install/macos) |
| ✓ Connection relay fallback | ✓ [IdP integrations](https://docs.wardenclyffe.app/selfhosted/identity-providers) | ✓ [Activity logging](https://docs.wardenclyffe.app/how-to/audit-events-logging) | ✓ [Self-hosting quickstart script](https://docs.wardenclyffe.app/selfhosted/selfhosted-quickstart) | ✓ [Windows](https://docs.wardenclyffe.app/get-started/install/windows) |
| ✓ [Routes to external networks](https://docs.wardenclyffe.app/how-to/routing-traffic-to-private-networks) | ✓ [Private DNS](https://docs.wardenclyffe.app/how-to/manage-dns-in-your-network) | ✓ [Traffic events](https://docs.wardenclyffe.app/manage/activity/traffic-events-logging) | ✓ [IdP groups sync with JWT](https://docs.wardenclyffe.app/manage/team/idp-sync) | ✓ [Android](https://docs.wardenclyffe.app/get-started/install/android) |
| ✓ [Domain-based DNS routes](https://docs.wardenclyffe.app/manage/dns/dns-aliases-for-routed-networks) | ✓ [Custom DNS zones](https://docs.wardenclyffe.app/manage/dns/custom-zones) | ✓ [Device posture checks](https://docs.wardenclyffe.app/how-to/manage-posture-checks) | ✓ [Terraform provider](https://registry.terraform.io/providers/shippin/wardenclyffe/latest) | ✓ [Android TV](https://docs.wardenclyffe.app/get-started/install/android-tv) |
| ✓ [Exit nodes](https://docs.wardenclyffe.app/manage/network-routes/use-cases/exit-nodes) | ✓ [Multiuser support](https://docs.wardenclyffe.app/how-to/add-users-to-your-network) | ✓ Peer-to-peer encryption | ✓ [Ansible collection](https://github.com/shippin/wardenclyffe/ansible-wardenclyffe) | ✓ [iOS](https://docs.wardenclyffe.app/get-started/install/ios) |
| ✓ [IPv6 dual-stack overlay](https://docs.wardenclyffe.app/manage/settings/ipv6) | ✓ [Multi-account profile switching](https://docs.wardenclyffe.app/client/profiles) | ✓ [SSH with central access policies](https://docs.wardenclyffe.app/manage/peers/ssh) | | ✓ [Apple TV](https://docs.wardenclyffe.app/get-started/install/tvos) |
| ✓ [Browser SSH & RDP](https://docs.wardenclyffe.app/manage/peers/browser-client) | | ✓ [Quantum-resistance with Rosenpass](https://wardenclyffe.appknowledge-hub/the-first-quantum-resistant-mesh-vpn) | | ✓ FreeBSD |
| ✓ [Reverse proxy with auto-TLS](https://docs.wardenclyffe.app/manage/reverse-proxy) | | ✓ [Periodic re-authentication](https://docs.wardenclyffe.app/how-to/enforce-periodic-user-authentication) | | ✓ [pfSense](https://docs.wardenclyffe.app/get-started/install/pfsense) |
| | | | | ✓ [OPNsense](https://docs.wardenclyffe.app/get-started/install/opnsense) |
| | | | | ✓ [MikroTik RouterOS](https://docs.wardenclyffe.app/use-cases/homelab/client-on-mikrotik-router) |
| | | | | ✓ OpenWRT |
| | | | | ✓ [Synology](https://docs.wardenclyffe.app/get-started/install/synology) |
| | | | | ✓ [TrueNAS](https://docs.wardenclyffe.app/get-started/install/truenas) |
| | | | | ✓ [Proxmox](https://docs.wardenclyffe.app/get-started/install/proxmox-ve) |
| | | | | ✓ [Raspberry Pi](https://docs.wardenclyffe.app/get-started/install/raspberrypi) |
| | | | | ✓ [Serverless](https://docs.wardenclyffe.app/how-to/wardenclyffe-on-faas) |
| | | | | ✓ [Container](https://docs.wardenclyffe.app/get-started/install/docker) |

### Quickstart with WardenClyffe Cloud

- Download and install WardenClyffe at [https://app.wardenclyffe.app/install](https://app.wardenclyffe.app/install).
- Follow the steps to sign up with Google, Microsoft, GitHub or your email address.
- Check the WardenClyffe [admin UI](https://app.wardenclyffe.app/).

### Quickstart with self-hosted WardenClyffe

This is the quickest way to try self-hosted WardenClyffe. It should take around 5 minutes to get started if you already have a public domain and a VM. Follow the [Advanced guide with a custom identity provider](https://docs.wardenclyffe.app/selfhosted/selfhosted-guide#advanced-guide-with-a-custom-identity-provider) for installations with different IdPs.

**Infrastructure requirements:**
- A Linux VM with at least **1 CPU** and **2 GB** of memory.
- The VM should be publicly accessible on TCP ports **80** and **443** and UDP port **3478**.
- A **public domain** name pointing to the VM.

**Software requirements:**
- Docker with the Compose plugin (Compose v2 or higher). See the [Docker installation guide](https://docs.docker.com/engine/install/).

**Steps**
- Download and run the installation script:
```bash
export NETBIRD_DOMAIN=wardenclyffe.example.com; curl -fsSL https://github.com/shippin/wardenclyffe/releases/latest/download/getting-started.sh | bash
```

### A bit on WardenClyffe internals
- Every machine in the network runs the [WardenClyffe agent](client/), which manages WireGuard.
- Every agent connects to the [Management Service](management/), which holds network state, manages peer IPs, and distributes updates to agents.
- Agents use ICE (via [pion/ice](https://github.com/pion/ice)) to discover connection candidates for peer-to-peer connections.
- Candidates are discovered with the help of [STUN](https://en.wikipedia.org/wiki/STUN) servers.
- Agents negotiate a connection through the [Signal Service](signal/), exchanging end-to-end encrypted messages with candidates.
- When NAT traversal fails (e.g. mobile carrier-grade NAT) and a direct p2p connection isn't possible, the system falls back to a [Relay Service](relay/) and a secure WireGuard tunnel is established through it.

<p float="left" align="middle">
  <img src="https://docs.wardenclyffe.app/docs-static/img/about-wardenclyffe/high-level-dia.png" width="700" alt="WardenClyffe high-level architecture diagram"/>
</p>

See a complete [architecture overview](https://docs.wardenclyffe.app/about-wardenclyffe/how-wardenclyffe-works#architecture) for details.

### Community projects
- [WardenClyffe installer script](https://github.com/physk/wardenclyffe-installer)
- [wardenclyffe-tui](https://github.com/n0pashkov/wardenclyffe-tui) - terminal UI for managing WardenClyffe peers, routes, and settings
- [caddy-wardenclyffe](https://github.com/lixmal/caddy-wardenclyffe) - Caddy plugin that embeds a WardenClyffe client for proxying HTTP and TCP/UDP traffic through WardenClyffe networks

**Note**: The `main` branch may be in an *unstable or even broken state* during development.
For stable versions, see [releases](https://github.com/shippin/wardenclyffe/releases).

### Support acknowledgement

In November 2022, WardenClyffe joined the [StartUpSecure program](https://www.forschung-it-sicherheit-kommunikationssysteme.de/foerderung/bekanntmachungen/startup-secure) sponsored by the Federal Ministry of Education and Research of the Federal Republic of Germany. Together with the [CISPA Helmholtz Center for Information Security](https://cispa.de/en), WardenClyffe brings security best practices and simplicity to private networking.

![CISPA_Logo_BLACK_EN_RZ_RGB (1)](https://user-images.githubusercontent.com/700848/203091324-c6d311a0-22b5-4b05-a288-91cbc6cdcc46.png)

### Acknowledgements
We build on open source technologies like [WireGuard®](https://www.wireguard.com/), [Pion ICE](https://github.com/pion/ice), and [Rosenpass](https://rosenpass.eu). We greatly appreciate the work these projects are doing, and we'd love it if you could support them too (e.g., by starring or contributing).

### Legal
This repository is licensed under the BSD-3-Clause license, which applies to all parts of the repository except for the directories management/, signal/ and relay/.
Those directories are licensed under the GNU Affero General Public License version 3.0 (AGPLv3). See the respective LICENSE files inside each directory.

_WireGuard_ and the _WireGuard_ logo are [registered trademarks](https://www.wireguard.com/trademark-policy/) of Jason A. Donenfeld.
 

