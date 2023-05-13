import env from "dotenv"
env.config();
import { expect } from "chai";
import { Client } from "../src/client";
import {
    ImagesSearchOptions,
} from "../src/interfaces";
import { fail } from "assert";
import { WhiskersError } from "../src/whiskersError";


describe("Client", () => {
    const apiKey = "foo";
    const client = new Client(apiKey);

    describe("getImages()", () => {
        it("should return a SearchImageResult object", async () => {
            const params: ImagesSearchOptions = { limit: 1, order: "RANDOM", mime_types: "gif,jpg,png" };
            const response = await client.getImages(params);
                        
            expect(response.data).to.be.an.instanceOf(Array);
            expect(response.data).to.have.length(1);
            expect(response.data[0]).to.have.property("id");
            expect(response.data[0]).to.have.property("url");
        });

        it("should show pagination results as NaN if order is RANDOM", async () => {
            const page = 2;
            const params: ImagesSearchOptions = { order: "RANDOM", limit:25, page };
            const response = await client.getImages(params);
            
            expect(response.meta["pagination-page"]).to.be.NaN;
        });
 
        it("should show pagination results as NaN with an invalid API Key", async () => {
            const page = 2;
            const params: ImagesSearchOptions = { order: "DESC", limit:25, page };
            const response = await client.getImages(params);            
            
            expect(response.meta["pagination-page"]).to.be.NaN;
        });
    });

    describe("getImageById()", () => {
        it("should return an Image object", async () => {
            const breedName = "Sphynx";
            const breedResponse = await client.getBreed(breedName);
            expect(breedResponse).to.not.equal([]);

            const response = await client.getImageById(breedResponse[0].reference_image_id);            
            expect(response).to.have.property("id", breedResponse[0].reference_image_id);
            expect(response).to.have.property("url");
            expect(response).to.have.property("breeds");            
        });

        it("should return null on an invalid ID", async () => {
            try {
                let result = await client.getImageById("Not a real id");
            
                expect(result).to.be.null; 
            } catch(error: any) {
                expect(error).to.be.instanceOf(WhiskersError);                
                expect(error.status).to.equal(400);
            }
        });
    });

    describe("getBreedList()", () => {
        it("should return a Breeds array", async () => {
            const response = await client.getBreedList();

            expect(response).to.be.an.instanceOf(Array);
            expect(response[0]).to.have.property("id");
            expect(response[0]).to.have.property("name");
        });
    });

    describe("getBreed()", () => {
        it("should return an array with one object on a specific name search", async () => {
            const breedName = "Sphynx";
            const response = await client.getBreed(breedName);

            expect(response).to.be.an.instanceOf(Array);
            expect(response.length).to.be.greaterThan(0);
            expect(response[0]).to.not.be.undefined;
            expect(response[0]).to.have.property("id");
            expect(response[0]).to.have.property("name", breedName);
        });

        it("should return an array with one object on a on a id search", async () => {
            const breedName = "sphy";
            const response = await client.getBreed(breedName);

            expect(response).to.be.an.instanceOf(Array);
            expect(response.length).to.be.greaterThan(0);
            expect(response[0]).to.not.be.undefined;
            expect(response[0]).to.have.property("id");
            expect(response[0]).to.have.property("name", "Sphynx");
        });

        it("should return a multiple objects when name/id is partially matched", async () => {
            const breedName = "a";
            const response = await client.getBreed(breedName);

            expect(response).to.be.an.instanceOf(Array);
            expect(response.length).to.be.greaterThan(1);
        });

        it("should return an empty array on an invalid breed name", async () => {
            const breedName = "not a real cat breed";
            const response = await client.getBreed(breedName);

            expect(response?.length).to.equal(0)
        });
    });

    describe("getCategoryList()", () => {
        it("Should return an array of Category objects", async () => {
            const response = await client.getCategoryList();

            expect(response).to.be.an.instanceOf(Array);
            expect(response[0]).to.have.property("id");
        });
    });
});
