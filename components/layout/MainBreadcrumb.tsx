import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface MainBreadcrumbProp {
  page: "book" | "profile" | "lists" ;
}

const MainBreadcrumb = ({page}: MainBreadcrumbProp) => {
  return (
    <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink 
      href={`/${page}`}
      className="capitalize"
      >{page}</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
  </BreadcrumbList>
</Breadcrumb>
  )
}
export default MainBreadcrumb