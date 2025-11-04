import { Router } from "express";
import MailController from "../controllers/mail.controllers";

const emailRoutes = Router();

emailRoutes.post('/reset', MailController.resetPassword);
emailRoutes.post('/welcome', MailController.welcome);
emailRoutes.post('/classInPersonReminder', MailController.classInPersonReminder);
emailRoutes.post('/classReminder', MailController.classReminder);
emailRoutes.post('/purchase', MailController.purchaseConfirmation);
emailRoutes.post('/plan', MailController.planSubscription);
emailRoutes.post('/reminderplan', MailController.subscriptionRenewalReminder);

export default emailRoutes;
