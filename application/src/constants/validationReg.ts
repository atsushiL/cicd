// 正規表現

// 社員番号の正規表現
export const usernameRegex = /^\d{8}$/

// パスワードの正規表現
export const passwordRegex = /^(?=.*[a-z])(?=.*[~!@#$%^&*_\-+=`|\(){}[\]:;"'<>,\.?\/])(?=.*[A-Z])(?=.*\d).{8,64}$/

// メールアドレスの正規表現
export const emailRegex =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

export const numberRegEx = /^\d+$/

// 電話番号の正規表現
export const telRegex = /^\d{10,11}$/
