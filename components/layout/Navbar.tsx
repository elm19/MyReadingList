import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import headerNavLinks from "@/data/headerNavLinks";

const Navbar = () => {
  return (
    <nav className="hidden sm:block">
      <NavigationMenu>
        {headerNavLinks.map((link) => (
          <NavigationMenuList key={link.href}>
            <NavigationMenuItem>
              {link.sub ? (
                <>
                  <NavigationMenuTrigger className="bg-background">{link.title}</NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white dark:bg-gray-800">
                    {link.children && Array.isArray(link.children) ? (
                      <div className="flex flex-col gap-4 min-w-[300px] p-2">
                        {link.children.map((child) => (
                          <NavigationMenuLink
                            key={child.href}
                            href={child.href}
                            className="py-1 px-2 rounded transition-color hover:text-accent-foreground"
                          >
                            <div className="font-medium">{child.title}</div>
                            <div className="text-muted-foreground">
                              {child.desc}
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    ) : null}
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink href={link.href}>
                  {link.title}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        ))}
      </NavigationMenu>
    </nav>
  );
};
export default Navbar;
