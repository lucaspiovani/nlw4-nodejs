import { Response, Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRespository';
import SendMailService from '../services/SendMailService';

class SendMailController {
    
    async execute(request: Request, response: Response){

        const { email, survey_id } = request.body;

        console.log("email", email);
        console.log("survey_id", survey_id);

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const userAlreadyExists = await usersRepository.findOne({email});

        console.log("userAlreadyExists", userAlreadyExists);

        if (!userAlreadyExists) {
            return response.status(400).json({ error: "User does not exists" });
        }

        const survey = await surveysRepository.findOne({id: survey_id});

        console.log("survey", survey);

        if (!survey) {
            return response.status(400).json({
                error: "Survey does not exists!"
            });
        }

        // Salvar as informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        });

        console.log("surveyUser", surveyUser);

        await surveysUsersRepository.save(surveyUser);
        //Enviar e-mail para o usuário

        await SendMailService.execute(email, survey.title, survey.description);

        return response.json(surveyUser);
    }
}

export { SendMailController }