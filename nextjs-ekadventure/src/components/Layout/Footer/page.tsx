import React from "react";
import Image from "next/image";
import HeaderNavLink from "../Header/NavLink";
import SocialIcons from "@/components/UI/Common/SocialIcons/page";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2D2D2D] text-white">
      {/* Main content container */}
      <div className="container-max-w-1280 mx-auto px-[15px] md:px-[25px] py-[20px]">
        <div className="flex flex-col md:flex-row justify-between items-center md:gap-4 gap-8 max-w-6xl mx-auto">
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
          <div className="w-full md:w-auto md:max-w-sm">
            <div className="bg-background-green-accent p-[10px] md:p-4 rounded-md w-full text-center">
              <h3 className="md:text-2xl font-semibold mb-2">
                Never miss an adventure!
              </h3>
              <p className="text-text-dark font-semibold mb-3 text-sm/5">
                Stay up to date with my latest experiences and exclusive
                adventures I wanna share.
              </p>
              <form action="/api/subscribe" method="POST" className="w-full">
                <div className="flex flex-row w-full overflow-hidden">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@mail.com"
                    className="flex-1 w-full px-4 py-2 bg-white text-gray-800 font-primary focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-background-blue-accent text-white px-6 py-2 whitespace-nowrap hover:bg-background-blue-accent/85 transition-colors"
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
      <div className="w-full h-[1px] bg-background-primary mt-4" />

      {/* Copyright container */}
      <div className="py-1">
        <p className="text-center">© {new Date().getFullYear()} Elie Kadoury</p>
      </div>
    </footer>
  );
};

export default Footer;
