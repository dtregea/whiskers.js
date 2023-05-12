import { AxiosError, AxiosResponse } from "axios";

/**
 * This class provides additional properties to give more context about errors.
 */
export class WhiskersError extends Error {
    /** The response data of the HTTP response.*/
    public detail: string;
    /** The URL of the HTTP request. This is undefined if no response was received. */
    public url: string | null;
    /** The HTTP status of the response. This is undefined if no response was received. */
    public status: number | null;
    
    /**
     * The constructor for the WhiskersError class.
     * @param {AxiosError} error - The AxiosError object from which to create the WhiskersError.
     */
    constructor(error: AxiosError) {
        super(error.message);
        this.detail = error.message;
        this.url = error.config.url ?? null
        this.status = null;
        if (error.response) {
            this.status = error.response.status;
            this.detail = error.response.data as string ?? null
        }
        Object.setPrototypeOf(this, WhiskersError.prototype);
    }
}
