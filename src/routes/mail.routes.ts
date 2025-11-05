import { Router } from "express";
import MailController from "../controllers/mail.controllers";

const emailRoutes = Router();

emailRoutes.post('/reset', MailController.resetPassword);
emailRoutes.post('/welcome', MailController.welcome);
emailRoutes.post('/classInPersonReminder', MailController.classInPersonReminder);
emailRoutes.post('/classReminder', MailController.classReminder);
emailRoutes.post('/purchaseConfirmation', MailController.purchaseConfirmation);
emailRoutes.post('/planSubscription', MailController.planSubscription);
emailRoutes.post('/subscriptionRenewalReminder', MailController.subscriptionRenewalReminder);

export default emailRoutes;
