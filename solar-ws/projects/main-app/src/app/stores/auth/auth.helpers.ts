import { LoginError } from "@contract"

type LoginErrorReason = LoginError['reason'];

const LoginErrorMessages: Record<LoginErrorReason, string> = {
    'Incorrect Password': 'הסיסמה שגויה',
    'User Id Not Found': 'שם המשתמש לא נמצא'
}

export function getLoginErrorMessage(reason: string | null): string {
    if (!reason) return '';
    if (Object.hasOwn(LoginErrorMessages, reason)) {
        return LoginErrorMessages[reason as LoginErrorReason];
    }
    return 'שגיאה לא ידועה';
}