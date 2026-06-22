export const productProjection = `{ _id, title, "slug": slug.current, brand, condition, quantity, price, salePrice, currency, requestPrice, shortDescription, "description": pt::text(description), featured, inStock, status, tags, specs[]{ key, value }, "category": category->title, "image": images[0].asset->url, "images": images[].asset->url }`;
export const productQuery = `*[_type == "product" && status == "active"] | order(featured desc, title asc) ${productProjection}`;
export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] ${productProjection}`;
export const productByIdQuery = `*[_type == "product" && _id == $id][0] ${productProjection}`;
export const categoryQuery = `*[_type == "category"] | order(sortOrder asc, title asc) { _id, title, "slug": slug.current, description, featured, sortOrder, "image": image.asset->url }`;
