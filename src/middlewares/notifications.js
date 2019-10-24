import { users } from '../models';
import { checkIfExistsInDb } from '../utils/searchDb';

export const checkEmailNotificationApproval = async (req, res, next) => {
    const { id } = req.user;
    const { emailNotification } = await checkIfExistsInDb(users, id, '');
    if (!emailNotification) {
        return res.status(403).json({
            success: false,
            message: 'You already unsubscribed from email notification'
        });
    }
    return next();
}