import  SanityClient from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";


export default client = new SanityClient({
    projectId: "mp0d2w8m",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21",

})


const builder = new ImageUrlBuilder(client);

export const urlFor = (source) =>builder.image(source);
 

 
