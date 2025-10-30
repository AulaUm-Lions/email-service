import { Router } from "express";
import MailController from "../controllers/mail.controllers";

const router = Router();

router.post('/reset', MailController.resetPassword);
router.post('/welcome', MailController.welcome);
router.post('/classInPersonReminder', MailController.classInPersonReminder);
router.post('/classReminder', MailController.classReminder);
router.post('/purchase', MailController.purchaseConfirmation);
router.post('/plan', MailController.planSubscription);
router.post('/reminderplan', MailController.subscriptionRenewalReminder);

export default router;
