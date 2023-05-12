import { AxiosError, AxiosResponse } from "axios";

/**
 * This class provides additional properties to give more context about errors.
 */
export class WhiskersError extends Error {
    /** The HTTP request that was made. */
    public request: any;
    /** The HTTP response that was received. This is null if no response was received. */
    public response: AxiosResponse | null;
    /** The HTTP status of the response. This is undefined if no response was received. */
    public status: number | undefined;
    /** The URL of the HTTP request. This is undefined if no response was received. */
    public url: string | undefined;
    /** The response data (body) of the HTTP response. This is undefined if no response was received. */
    public detail: string | undefined;

    /**
     * The constructor for the WhiskersError class.
     * @param {AxiosError} error - The AxiosError object from which to create the WhiskersError.
     */
    constructor(error: AxiosError) {
        super(error.message);
        this.request = error.request;
        this.response = error.response ?? null;
        if (this.response) {
            this.detail = this.response.data;
            this.status = this.response.status;
            this.url = this.response.config.url;
        }
        Object.setPrototypeOf(this, WhiskersError.prototype);                        
    }
}
