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

export function getUserInitials(name: string) : string {
    const names = name.split(' ');
    const letters = names.map(n => n.charAt(0).toUpperCase());
    const initials = letters.join('');
    // limit to 2 characters
    const res = initials.substring(0, 2);
    return res;   
}