export const PasswordRules = () => {
  return (
    <div className="border-b">
      <h3>パスワードは次の条件を満たす必要があります</h3>
      <ul className="list-disc pl-5 py-3">
        <li>8 ~ 64文字</li>
        <li>社員番号と同一は不可</li>
        <li>英大小文字数字が含まれる</li>
        <li>不英数文字が含まれる: ~!@#$%^&*_-+=`|\{`(){}[]:;"'<>`},.?/</li>
      </ul>
    </div>
  );
};
