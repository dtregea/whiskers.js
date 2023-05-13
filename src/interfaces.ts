/**
 * @property SearchImageResult An interface representing the structure of a search image result.
 */
export interface SearchImageResult {
    /** The metadata object includes the total count of images, current pagination page, and pagination limit. */
    meta: {
        /** The total count of images. Pagination numbers will only be provided with a valid API Key. */
        'pagination-count': number,
        /** The current page in the pagination. Pagination numbers will only be provided with a valid API Key. */
        'pagination-page': number,
        /** The maximum number of items to be returned in the response. Pagination numbers will only be provided with a valid API Key. */
        'pagination-limit': number
    },
    /** An array of Image objects returned from the search. */
    data: Array<Image>
}

/**
 * @property Image An interface representing the structure of a cat image.
 */
export interface Image {
    /** The unique identifier for the image. */
    id: string,
    /** The width of the image. */
    width: string,
    /** The height of the image. */
    height: string,
    /** The URL of the image. */
    url: string,
    /** An optional array of Breed objects associated with the image. */
    breeds?: Breed[]
}

/**
 * @property Breed An interface representing the structure of a cat breed.
 */
export interface Breed {
    /** The weight of the breed, provided in both imperial and metric units. */
    weight: { imperial: string, metric: string },
    /** The unique identifier for the breed. */
    id: string,
    /** The name of the breed. */
    name: string,
    /** The URL for the breed's page on the Cat Fanciers' Association website. */
    cfa_url: string,
    /** The URL for the breed's page on the Vetstreet website. */
    vetstreet_url: string,
    /** The URL for the breed's page on the VCA Hospitals website. */
    vcahospitals_url: string,
    /** The general temperament of the breed. */
    temperament: string,
    /** The origin country of the breed. */
    origin: string,
    /** The country codes associated with the breed. */
    country_codes: string,
    /** A description of the breed. */
    description: string,
    /** The typical lifespan of the breed. */
    life_span: string,
    /** A numeric value representing whether this breed is suited for indoor living. */
    indoor: number,
    /** A numeric value representing whether this breed tends to be a "lap cat". */
    lap: number,
    /** Alternate names for the breed. */
    alt_names: string,
    /** The adaptability level of the breed. */
    adaptability: number,
    /** The affection level of the breed. */
    affection_level: number,
    /** A numeric value representing how child-friendly this breed is. */
    child_friendly: number,
    /** A numeric value representing how dog-friendly this breed is. */
    dog_friendly: number,
    /** The energy level of the breed. */
    energy_level: number,
    /** A numeric value representing the grooming needs of this breed. */
    grooming: number,
    /** A numeric value representing the potential health issues of this breed. */
    health_issues: number,
    /** The intelligence level of the breed. */
    intelligence: number,
    /** The shedding level of the breed. */
    shedding_level: number,
    /** The social needs of the breed. */
    social_needs: number,
    /** A numeric value representing how stranger-friendly this breed is. */
    stranger_friendly: number,
    /** The vocalisation level of the breed. */
    vocalisation: number,
    /** A numeric value representing whether this breed is considered experimental.
    /** A numeric value representing whether this breed is hairless. */
    hairless: number,
    /** A numeric value representing whether this breed is natural. */
    natural: number,
    /** A numeric value representing whether this breed is rare. */
    rare: number,
    /** A numeric value representing whether this breed has a rex coat. */
    rex: number,
    /** A numeric value representing whether this breed has a suppressed tail. */
    suppressed_tail: number,
    /** A numeric value representing whether this breed has short legs. */
    short_legs: number,
    /** The URL for the breed's page on Wikipedia. */
    wikipedia_url: string,
    /** A numeric value representing whether this breed is hypoallergenic. */
    hypoallergenic: number,
    /** The reference ID of the breed's image. */
    reference_image_id: string
}

/**
 * @property ImagesSearchOptions An interface representing the options that can be passed when searching for images.
 */
export interface ImagesSearchOptions {
    /** The size of the images to search for. Can be 'small', 'med', or 'full'. */
    size?: 'small' | 'med' | 'full',
    /** The available image types. Defaults to all types. Can be 'gif', 'jpg', 'png', or any combination of these. */
    mime_types?: 'gif' | 'jpg' | 'png' | 'gif,jpg' | 'gif,png' | 'jpg,png' | 'gif,jpg,png',
    /** Order of results. Default is Random. If either ASC or DESC is passed then the Pagination headers will be on the response allowing you to see the total amount of results. Pagination numbers will only be provided with a valid API Key. */
    order?: 'RANDOM' | 'ASC' | 'DESC',
    /** The page number for results. Only used when order is ASC or DESC. Pagination can only be acheived with a valid API Key. */
    page?: number,
    /** The maximum number of results to return. Default is 1. You can only pass 1 with an invalid API Key, with a valid key you can pass up to 25. */
    limit?: number,
    /** Comma delimited string of integers containing the id's of the Categories to search for. Category id's can found with getCategoryList(). */
    category_ids?: string,
    /** Comma delimited string of integers containing the id's of the Breeds to search for. Breed id's can found with getBreedList(). */
    breed_ids?: string,
    /** 0 or 1. Default is 0. Specifying 1 will only return images that have breed information. A valid API key is required to retrieve breed information on images. */
    has_breeds?: 0 | 1
}

export interface Category {
    /** The unique identifier for the category. */
    id: number,
    /** The name of the category. */
    name: string
}