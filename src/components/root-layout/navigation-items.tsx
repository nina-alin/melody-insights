import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import GreenishLink from "@/components/common/template/greenish-link";
import { SVGAttributes } from "react";

type NavigationItemsProps = {
  item: {
    name: string;
    href: string;
    icon: (properties: SVGAttributes<SVGElement>) => JSX.Element;
  };
};
const NavigationItems = ({ item }: NavigationItemsProps) => {
  const { pathname } = useRouter();

  return (
    <Menu.Item key={item.name}>
      {({ close }) => (
        <div
          className={`flex items-center gap-3.5 ${
            pathname === item.href && "font-bold"
          }`}
        >
          <item.icon />
          <GreenishLink href={item.href} selected={pathname === item.href}>
            <button onClick={close} type="button">
              {item.name}
            </button>
          </GreenishLink>
        </div>
      )}
    </Menu.Item>
  );
};

export default NavigationItems;
