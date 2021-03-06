import { Request, Response } from "express";
import { FindMoviesAvailableUseCase } from "./FindMoviesAvailableUseCase";
const strings = require("../../strings.json");

export class FindMoviesAvailableController {
    constructor(
        private findMoviesAvalaibleUseCase: FindMoviesAvailableUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        
        try{
            const movies = await this.findMoviesAvalaibleUseCase.execute()

            return response.status(200).json({movies}).send();
        } catch (err) {
            return response.status(400).json({
                message: err.message || strings.error
            })
        }
    }
}