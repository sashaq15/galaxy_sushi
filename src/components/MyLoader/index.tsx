import ContentLoader from "react-content-loader"

const MyLoader = (props:any) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
     <circle cx="163" cy="282" r="2" /> 
     <rect x="26" y="36" rx="30" ry="30" width="250" height="390" />
  </ContentLoader>
)

export default MyLoader