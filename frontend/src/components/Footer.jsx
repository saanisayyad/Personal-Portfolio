import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import { getProfile } from "../services/profileService";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        if (mounted) setProfile(data);
      } catch (error) {
        console.error("Unable to load footer profile:", error);
      }
    };

    fetchProfile();
    return () => {
      mounted = false;
    };
  }, []);

  const socials = [
    { label: "GitHub", href: profile?.github, Icon: FaGithub },
    { label: "LinkedIn", href: profile?.linkedin, Icon: FaLinkedin },
    { label: "Instagram", href: profile?.instagram, Icon: FaInstagram },
  ].filter((item) => item.href);

  return (
    <footer id="footer" className="relative mt-16 overflow-hidden border-t border-white/[0.08]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 h-56 w-[32rem] -translate-x-1/2 rounded-full bg-cyan-500/[0.045] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
              Keep in touch
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Let’s connect<span className="text-cyan-300">.</span>
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
              Interested in my work or have an opportunity to discuss? Find me on these platforms.
            </p>
          </div>

          {socials.length > 0 && (
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="group inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.09] bg-white/[0.035] text-zinc-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/[0.07] hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  <Icon size={18} />
                  <ArrowUpRight size={11} className="absolute translate-x-3 -translate-y-3 opacity-0 transition-opacity group-hover:opacity-70" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-white/[0.07] pt-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Mohammadsaani Sayyad. All rights reserved.</p>
          <p className="text-zinc-600">Designed with intention · Built with React & Node.js</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
