import React from "react";
import Image from "next/image";
import HeaderNavLink from "../Header/NavLink";
import SocialIcons from "../SocialIcons/page";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2D2D2D] text-white">
      {/* Main content container */}
      <div className="container-max-w-1280 mx-auto px-2 md:px-[25px] py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-6xl mx-auto">
          {/* Logo and Social Media Section */}
          <div className="flex-center-col space-y-6">
            <Image
              src="/images/Logo_Site_CUT_FOOTER.png"
              alt="EkAdventure Logo"
              width={200}
              height={200}
              className="w-[260px] h-auto"
            />
            <SocialIcons />
          </div>

          {/* Navigation Links - Vertical Stack */}
          <nav className="space-y-3 hidden lg:block">
            <HeaderNavLink href="/">HOME</HeaderNavLink>
            <HeaderNavLink href="/blog">BLOG</HeaderNavLink>
            <HeaderNavLink href="/shop">SHOP</HeaderNavLink>
            <HeaderNavLink href="/about">ABOUT</HeaderNavLink>
            <HeaderNavLink href="/contact">CONTACT</HeaderNavLink>
          </nav>

          {/* Newsletter Subscription */}
          <div className="flex-center-row">
            <div className="bg-background-green-accent p-2 md:p-4 rounded-md md:max-w-sm w-full text-center">
              <h2 className="font-semibold mb-2">Never miss an adventure!</h2>
              <p className="text-sm mb-3">
                Stay up to date with my latest experiences and exclusive
                adventures I wanna share.
              </p>
              <form
                action="/api/subscribe"
                method="POST"
                className="w-full flex flex-row"
              >
                <div className="">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@mail.com"
                    className="flex-1 px-4 py-2 bg-white text-gray-800 font-primary focus:outline-none"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-background-blue-accent text-white px-6 py-2 hover:bg-background-blue-accent/85 transition-colors"
                  >
                    SUBSCRIBE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Divider - full width */}
      <div className="w-full h-[1px] bg-background-primary" />

      {/* Copyright container */}
      <div className="py-1">
        <p className="text-center">© {new Date().getFullYear()} Elie Kadoury</p>
      </div>
    </footer>
  );
};

export default Footer;
