import { AtSign, BriefcaseBusiness, Camera, Moon, Sun, Users } from "lucide-react"

import { DotPattern } from "@/components/ui/dot-pattern"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Selected Work", href: "#work" },
  { label: "Experience", href: "#resume" },
]

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com", icon: Users },
  { label: "Twitter", href: "https://twitter.com", icon: AtSign },
  { label: "Instagram", href: "https://www.instagram.com", icon: Camera },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: BriefcaseBusiness },
]

interface FooterdemoProps {
  isDarkMode: boolean
  onDarkModeChange: (checked: boolean) => void
}

function Footerdemo({ isDarkMode, onDarkModeChange }: FooterdemoProps) {
  return (
    <footer className={cn("modern-footer", isDarkMode && "modern-footer--dark")}>
      <DotPattern width={22} height={22} cx={1} cy={1} cr={0.8} className="footer-dots" />
      <div className="modern-footer-inner">
        <div className="modern-footer-grid">
          <div className="footer-connect">
            <h2>Stay Connected</h2>
            <p>Open to UX and product design roles in Dublin and remote. Let&apos;s talk.</p>
            <h3 className="footer-contact-label">Contact</h3>
            <div className="footer-contact-links" aria-label="Contact links">
              <span>Email → [your email]</span>
              <a href="https://www.linkedin.com/in/aditimjo/" target="_blank" rel="noreferrer">
                LinkedIn → linkedin.com/in/aditimjo/
              </a>
              <span>Résumé (PDF) → [link]</span>
            </div>
            <div className="footer-orb" aria-hidden="true" />
          </div>

          <div>
            <h3>Quick Links</h3>
            <nav className="modern-footer-links" aria-label="Footer navigation">
              {quickLinks.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3>Status</h3>
            <address className="footer-contact">
              <p>Dublin, IE · Available now</p>
            </address>
          </div>

          <div>
            <h3>Follow Me</h3>
            <TooltipProvider delayDuration={150}>
              <div className="footer-socials">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="footer-social-link"
                      >
                        <Icon aria-hidden="true" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow me on {label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>

            <div className="footer-theme-control">
              <Sun aria-hidden="true" />
              <Switch
                id="footer-dark-mode"
                checked={isDarkMode}
                onCheckedChange={onDarkModeChange}
              />
              <Moon aria-hidden="true" />
              <Label htmlFor="footer-dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Aditi Joshi. All rights reserved.</p>
          <nav aria-label="Legal">
            <a href="#home">Privacy</a>
            <a href="#home">Terms</a>
            <a href="#home">Cookies</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
