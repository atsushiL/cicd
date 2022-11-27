export const headerMenuList = [
  {
    value: 'お客様情報',
    info: [
      { title: '仮申込み客一覧', path: '/customers/apply_customer_list' },
      { title: '見込み客一覧', path: '/customers/prospective_customer_list' },
    ],
  },
  {
    value: '物件情報',
    info: [
      { title: '物件情報一覧', path: '/property/property_list' },
      { title: '買取基準一覧', path: '/property/property_purchase_list' },
    ],
  },
  {
    value: 'その他',
    info: [
      { title: 'ヒアリング項目一覧', path: '/others/interview_item_list' },
      { title: '紹介会社一覧', path: '/others/referral_company_list' },
      { title: '評価会社一覧', path: '/others/review_company_list' },
      { title: '販促方法一覧', path: '/others/promotion_method_list' },
      { title: '販促内容一覧', path: '/others/promotion_detail_list' },
      { title: 'ALB反社チェック', path: '/others/alb_check_list' },
    ],
  },
];

export const userMenuList = [
  { title: '使用者管理', path: '/userManagement' },
  { title: 'パスワード変更', path: '/password/change' },
  { title: 'ログアウト', path: '/login' },
];

export const area = [
  { title: '北海道', value: 'hokkaido' },
  { title: '東北', value: 'touhoku' },
  { title: '関東', value: 'kantou' },
  { title: '中部', value: 'chubo' },
  { title: '近畿', value: 'kinki' },
  { title: '中国', value: 'chukoku' },
  { title: '四国', value: 'shikoku' },
  { title: '九州', value: 'kyushu' },
];

export const prefectures = [
  { title: '北海道', value: 'hokkaido' },
  { title: '青森県', value: 'aomori' },
  { title: '岩手県', value: 'iwata' },
  { title: '宮城県', value: 'miyagi' },
  { title: '秋田県', value: 'akita' },
  { title: '山形県', value: 'yamagata' },
  { title: '福島県', value: 'fukushima' },
  { title: '茨城県', value: 'ibaraki' },
  { title: '栃木県', value: 'tochigi' },
  { title: '群馬県', value: 'gunma' },
  { title: '埼玉県', value: 'saitama' },
  { title: '千葉県', value: 'chiba' },
  { title: '東京都', value: 'tokyo' },
  { title: '神奈川県', value: 'kanagawa' },
  { title: '新潟県', value: 'nigata' },
  { title: '富山県', value: 'toyama' },
  { title: '石川県', value: 'ishigawa' },
  { title: '福井県', value: 'fukui' },
  { title: '山梨県', value: 'yamanashi' },
  { title: '長野県', value: 'nagano' },
  { title: '岐阜県', value: 'gifu' },
  { title: '静岡県', value: 'shizuoka' },
  { title: '愛知県', value: 'aichi' },
  { title: '三重県', value: 'mie' },
  { title: '滋賀県', value: 'shiga' },
  { title: '京都府', value: 'kyoto' },
  { title: '大阪府', value: 'osaka' },
  { title: '兵庫県', value: 'hyogo' },
  { title: '奈良県', value: 'nara' },
  { title: '和歌山県', value: 'wakayama' },
  { title: '鳥取県', value: 'tottori' },
  { title: '島根県', value: 'shimane' },
  { title: '岡山県', value: 'okayama' },
  { title: '広島県', value: 'hiroshima' },
  { title: '山口県', value: 'yamaguchi' },
  { title: '徳島県', value: 'tokushima' },
  { title: '香川県', value: 'kagawa' },
  { title: '愛媛県', value: 'ehime' },
  { title: '高知県', value: 'kochi' },
  { title: '福岡県', value: 'fukuoka' },
  { title: '佐賀県', value: 'saga' },
  { title: '長崎県', value: 'nagasaki' },
  { title: '熊本県', value: 'kumamoto' },
  { title: '大分県', value: 'oita' },
  { title: '宮崎県', value: 'miyazaki' },
  { title: '鹿児島県', value: 'kagoshima' },
  { title: '沖縄県', value: 'okinawa' },
];

export const results = [
  { title: '承認', value: 'OK' },
  { title: '否決', value: 'NG' },
];

export const purchaseResult = [
  { title: '承認', value: 'ok' },
  { title: '否決', value: 'no' },
];

export const tableHeadForApply = [
  '申込日',
  'お客様氏名',
  'カナ氏名',
  '申込ステータス',
  '仮申込結果',
  '反社チェック',
  '結果',
  '担当者',
  '最終交渉日',
  '詳細',
];

export const tableHeadForProspective = [
  'お客様氏名',
  'カナ氏名',
  '都道府県',
  '担当者',
  '登録日',
  '最終交渉日時',
  '詳細',
];

export const tableHeadForCompanyReview = ['登録日', '会社名', '先方担当者', '電話番号', '特記事項', '編集'];

export const dummyReviewCompanies = [
  {
    id: "0",
    info: {
      created_at: '2022/07/22',
      company: 'アイフル株式会社',
      staff: '愛振 二郎',
      telephone: '123-4567-8910',
    },
  },
  {
    id: "1",
    info: {
      created_at: '2022/07/22',
      name: 'アイフル株式会社',
      created_by: '愛振 二郎',
      phone_no: '123-4567-8910',
    },
  },
  {
    id: "2",
    info: {
      created_at: '2022/07/22',
      name: 'アイフル株式会社',
      created_by: '愛振 二郎',
      phone_no: '123-4567-8910',
    },
  },
  {
    id: "3",
    info: {
      created_at: '2022/07/22',
      name: 'アイフル株式会社',
      created_by: '愛振 二郎',
      phone_no: '123-4567-8910',
    },
  },
  {
    id: "4",
    info: {
      created_at: '2022/07/22',
      name: 'アイフル株式会社',
      created_by: '愛振 二郎',
      phone_no: '123-4567-8910',
    },
  },
];

export const tableHeadForCompanyReferral = ['登録日', '会社名', '先方担当者', '電話番号', '紹介件数', '編集'];

export const dummyReferralCompanies = [
  {
    id: '0',
    info: {
      registrationDate: '2022/07/22',
      company: 'アイフル株式会社',
      staff: '愛振 二郎',
      telephone: '123-4567-8910',
      referralNum: '5',
    },
  },
  {
    id: '1',
    info: {
      registrationDate: '2022/07/22',
      company: 'アイフル株式会社',
      staff: '愛振 二郎',
      telephone: '123-4567-8910',
      referralNum: '5',
    },
  },
  {
    id: '2',
    info: {
      registrationDate: '2022/07/22',
      company: 'アイフル株式会社',
      staff: '愛振 二郎',
      telephone: '123-4567-8910',
      referralNum: '5',
    },
  },
  {
    id: '3',
    info: {
      registrationDate: '2022/07/22',
      company: 'アイフル株式会社',
      staff: '愛振 二郎',
      telephone: '123-4567-8910',
      referralNum: '5',
    },
  },
  {
    id: '4',
    info: {
      registrationDate: '2022/07/22',
      company: 'アイフル株式会社',
      staff: '愛振 二郎',
      telephone: '123-4567-8910',
      referralNum: '5',
    },
  },
  {
    id: '5',
    info: {
      registrationDate: '2022/07/22',
      company: 'アイフル株式会社',
      staff: '愛振 二郎',
      telephone: '123-4567-8910',
      referralNum: '5',
    },
  },
];

export const tableHeadForNegotiationHistory = ['日時', '販促方法', '反応', '内容', '担当者'];

export const tableHeadForALBDetail = [
  '氏名',
  '取引状況',
  '契約書に反社会的勢力の排除条項',
  '判明した日',
  '経緯',
  '対応方針',
  '入庫日',
];

export const tableDetailForALB = [
  { title: '漢字氏名', value: '川西 将也' },
  { title: 'カナ氏名', value: 'カワニシ マサヤ' },
  { title: '生年月日', value: '平成1年1月1日' },
  { title: '住所', value: '滋賀県草津市西大路町1-1' },
  { title: '自宅電話', value: '077-561-5151' },
  { title: '携帯電話', value: '090-9999-9999' },
  { title: '勤務先', value: 'アイフル' },
  { title: '勤務先電話', value: '099-999-9999' },
];

export const tableDetailForALBAccount = [
  { title: '口座概要', value: '正常' },
  { title: '残高', value: '1,000,000円' },
  { title: '新規査定貸付日', value: '令和4年1月1日' },
];

export const dummyForALBDetail = [
  {
    id: '1',
    info: {
      name: '川西 将也',
      account: '正常',
      contract: '有',
      result: '令和4年9月30日',
      reason: '京都府警への照会で反社と判明',
      response: '未定（今後協議実施）',
      date: '令和4年10月6日',
    },
  },
];

export const dummyNegotiationHistory = [
  {
    id: '1',
    info: {
      date: '2022/08/28 14:00',
      promotionMethod: '架電',
      reply: 'オフ',
      content: 'ここに交渉内容が表示されます',
      staff: '愛振 太郎',
    },
  },
  {
    id: '2',
    info: {
      date: '2022/08/28 14:00',
      promotionMethod: '架電',
      reply: '拒否',
      content: 'ここに交渉内容が表示されます',
      staff: '愛振 太郎',
    },
  },
  {
    id: '3',
    info: {
      date: '2022/08/28 14:00',
      promotionMethod: '受電',
      reply: 'コール',
      content: 'ここに交渉内容が表示されます',
      staff: '愛振 太郎',
    },
  },
  {
    id: '4',
    info: {
      date: '2022/08/28 14:00',
      promotionMethod: '訪問',
      reply: '意志有',
      content: 'ここに交渉内容が表示されます',
      staff: '愛振 太郎',
    },
  },
  {
    id: '5',
    info: {
      date: '2022/08/28 14:00',
      promotionMethod: '架電',
      reply: '意思無',
      content: 'ここに交渉内容が表示されます',
      staff: '愛振 太郎',
    },
  },
  {
    id: '6',
    info: {
      date: '2022/08/28 14:00',
      promotionMethod: '架電',
      reply: '応答',
      content: 'ここに交渉内容が表示されます',
      staff: '愛振 太郎',
    },
  },
];

export const tableHeadForPropertyPurchase = ['買取基準項目名', '買取基準', '登録者', '登録日時', '特記事項', '編集'];

export const promotionMethod = [
  { title: '架電', value: '架電' },
  { title: '受電', value: '受電' },
  { title: '訪問', value: '訪問' },
];

export const reply = [
  { title: 'オフ', value: 'オフ' },
  { title: '拒否', value: '拒否' },
  { title: 'コール', value: 'コール' },
  { title: '意志有', value: '意志有' },
  { title: '意思無', value: '意思無' },
  { title: '応答', value: '応答' },
];

export const TabHeader = [
  'お客様情報',
  '勤務先情報',
  '口座情報',
  '家族情報',
  'ローン情報',
  '申込情報',
  'ヒアリング',
  '反社チェック',
  '交渉履歴',
];

export const promotionMethodHeader = ['販促方法', '登録者', '登録日時', '編集'];

export const promotionDetailHeader = ['販促内容', '登録者', '登録日時', '編集'];

export const tableHeadForInterviewItem = ['ヒアリング項目名', '登録者', '登録日時', '特記事項', '編集'];

export const dummyInterviewSelectList = [
  { title: 'クレカ所持数', value: 'creditCardNum' },
  { title: 'スポーツ経験', value: 'sportExperience' },
  { title: 'ゲーム', value: 'game' },
  { title: 'PCに精通してるか', value: 'computerSkill' },
];

export const tableHeadForUserManagement = ['権限', '社員番号', '社員氏名', 'ステータス', 'ステータス切り替え', '編集'];

export const role = [
  { title: '管理者', value: "0" },
  { title: '一般社員', value: "1" },
  { title: 'セールス社員', value: "2" },
];

export const status = [
  { title: '有効', value: 'enable' },
  { title: '無効', value: 'disable' },
];

export const detailsForCustomerInfo = [
  { title: '申込日', name: 'applyDate', type: 'date' },
  { title: '氏名', name: 'name', type: 'text' },
  { title: 'カナ氏名', name: 'name_kana', type: 'text' },
  { title: '属性', name: 'applyType', type: 'radio' },
  { title: '自宅番号', name: 'homeNumber', type: 'tel' },
  { title: '携帯番号', name: 'phoneNumber', type: 'tel' },
  { title: 'メールアドレス', name: 'email', type: 'email' },
  { title: '生年月日', name: 'birthday', type: 'date' },
  { title: '郵便番号', name: 'postcode', type: 'text' },
  { title: '都道府県', name: 'prefectures', type: 'text' },
  { title: '市区町村', name: 'city', type: 'text' },
  { title: '番地', name: 'houseNumber', type: 'text' },
  { title: '建物名・部屋番号', name: 'buildingName', type: 'text' },
  { title: '特記事項', type: 'memo', name: 'memo' },
];

export const dummyDetailsForEditInfo = [
  { title: '氏名', value: '愛振 太郎', type: 'text', name: 'name' },
  { title: 'カナ氏名', value: 'アイフル タロウ', type: 'text', name: 'name_kana' },
  { title: '自宅番号', value: '000-0000-0000', type: 'text', name: 'homeNumber' },
  { title: '携帯番号', value: '080-9999-9999', type: 'text', name: 'phoneNumber' },
  { title: 'メールアドレス', value: 'example@aiful.co.jp', type: 'email', name: 'email' },
  { title: 'エリア', value: '', type: 'select', name: 'area' },
  { title: '都道府県', value: '', type: 'select', name: 'prefectures' },
];

export const detailsForJobInfo = [
  { title: '勤務先名', name: 'companyName', type: 'text' },
  { title: '電話番号', name: 'phoneNumber', type: 'tel' },
  { title: '業種', name: 'industryType', type: 'text' },
  { title: '職種', name: 'jobType', type: 'text' },
  { title: '年収', name: 'annualIncome', type: 'text' },
];

export const detailsForBankInfo = [
  { title: '口座名義人', name: 'accounterHolder', type: 'text' },
  { title: '口座番号', name: 'accountNumber', type: 'tel' },
  { title: '口座種別', name: 'accountType', type: 'radio' },
  { title: '金融機関名', name: 'bankName', type: 'text' },
  { title: '支店名', name: 'bankBranch', type: 'text' },
];

export const account_type = [
  { title: '普通', value: "0" },
  { title: '当座', value: "1" },
];

export const applyType = [
  { title: '個人', value: 'personal' },
  { title: '法人', value: 'company' },
];

export const dummyDetailsForOthersInfoA = [
  { title: 'ステータス', value: '未確認', type: 'select', name: 'status' },
  { title: '結果', value: 'OK', type: 'radio', name: 'resultType' },
];
export const detailsForOthersInfoA = [
  { title: 'ステータス', type: 'select', name: 'status' },
  { title: '結果', type: 'radio', name: 'resultType' },
];
export const dummyDetailsForApplyInfo = [
  { title: '希望家賃', value: '7', type: 'text', name: 'houseRent' },
  { title: '希望買取金額', value: '1200', type: 'text', name: 'propertyPurchase' },
  { title: '当社を知った経緯', value: '', type: 'text', name: 'reason' },
  { title: '紹介会社', value: '', type: 'text', name: 'companyName' },
  { title: '想定居住期間', value: '10', type: 'text', name: 'period' },
];

export const detailsForOthersInfoB = [
  { title: '希望家賃', type: 'text', name: 'houseRent' },
  { title: '希望買取金額', type: 'text', name: 'propertyPurchase' },
  { title: '当社を知った経緯', type: 'text', name: 'reason' },
  { title: '紹介会社', type: 'text', name: 'companyName' },
  { title: '想定居住期間', type: 'text', name: 'period' },
  { title: '特記事項', type: 'memo', name: 'memo' },
];

export const resultType = [
  { title: 'OK', value: 'OK' },
  { title: 'NG', value: 'NG' },
];

export const statusSelectList = [
  { title: '未確認', value: 'unconfirmed' },
  { title: '確認中', value: 'confirming' },
  { title: '確認済', value: 'confirmed' },
];

export const propertyTabHeader = ['買取調査', '建物情報', '土地情報', '抵当権情報', '評価', '収益SIM'];

export const checks = [
  { text: '承認', value: 'approve' },
  { text: '否決', value: 'disapprove' },
];

export const tableHeadPropertyList = ['申込日', '申込者', '買取基準進捗', '買取調査結果', '詳細'];

export const householdType = [
  { title: '同一', value: 'same' },
  { title: '不同', value: 'different' },
];

export const agreeType = [
  { title: '有', value: 'yes' },
  { title: '無', value: 'no' },
];

export const applyResult = [
  { title: '承認', value: 'approve' },
  { title: '否決', value: 'disapprove' },
];

export const applyStatus = [
  { title: 'お客様合意', value: 'agree' },
  { title: '再交渉', value: 'renegotiate' },
];

export const detailsForLoanInfo = [
  { title: '住宅ローン残債', name: 'loanBalance', type: 'text' },
  { title: '毎月の返済額', name: 'repaymentAmount', type: 'text' },
  { title: '賞与月の返済額', name: 'repaymentAmount_bonus', type: 'text' },
  { title: '滞納額', name: 'arrears', type: 'text' },
];

export const tableHeadFamilyDetail = ['同居家族名', '続柄', '年齢', '職業', '家計管理', '利用同意有無', '編集'];

export const tableHeadForInterview = ['ヒアリング項目', '回答内容', '編集'];

export const tableBodyPropertyList = [
  {
    id: Math.random().toString(),
    info: {
      date: '2022/09/02',
      name: '藍布留太郎',
      progress: '7/7',
      result: '承認',
    },
  },
  {
    id: Math.random().toString(),
    info: {
      date: '2022/09/02',
      name: '藍布留太郎',
      progress: '7/7',
      result: '否決',
    },
  },
  {
    id: Math.random().toString(),
    info: {
      date: '2022/09/02',
      name: '藍布留太郎',
      progress: '3/7',
      result: '-',
    },
  },
];
export const approveList = ['承認', '契約済', 'OK', 'お客様合意', '確認済', '有効'];
export const disapproveList = ['NG', '無効', '否決'];

export const detailsForSaleInfo = [
  { title: '申込日', value: 'requestDay', type: 'date' },
  { title: '申込者', value: 'name', type: 'text' },
  { title: '買取調査結果', value: 'check', type: 'text' },
  { title: '買取日', value: 'saleDay', type: 'date' },
  { title: '買取調査理由', value: 'saleCause', type: 'text' },
];

// ToDo削除予定
export const dummyDetailsForSaleInfo = [
  { title: '申込日', value: '2022-02-22', type: 'date', name: 'requestDay' },
  { title: '申込者', value: '愛染太郎', type: 'text', name: 'name' },
  { title: '判定', value: '承認', type: 'radio', name: 'saleResult' },
  { title: '買取日', value: '2022-08-17', type: 'date', name: 'saleDay' },
  { title: '買取調査理由', value: '特になし', type: 'text', name: 'saleCause' },
];

export const saleResult = [
  { title: '承認', value: 'approve' },
  { title: '否決', value: 'disapprove' },
];

export const tableHeadForPropertyList = ['買取調査名', '買取基準', '調査結果', '判定', '理由', '編集'];

export const dummySaleList = [
  {
    id: '1',
    info: {
      researchName: 'テスト１',
      saleStandard: '価格',
      searchResult: '結果',
      judge: '◯',
      cause: '基準を満たしているため',
    },
  },
  {
    id: '2',
    info: {
      researchName: 'テスト2',
      saleStandard: '価格',
      searchResult: '結果',
      judge: '◯',
      cause: '基準を満たしているため',
    },
  },
  {
    id: '3',
    info: {
      researchName: 'テスト3',
      saleStandard: '価格',
      searchResult: '結果',
      judge: '◯',
      cause: '基準を満たしているため',
    },
  },
  {
    id: '4',
    info: {
      researchName: 'テスト4',
      saleStandard: '価格',
      searchResult: '結果',
      judge: '◯',
      cause: '基準を満たしているため',
    },
  },
];

export const researchResult = [
  { title: '〇', value: 'OK' },
  { title: 'X', value: 'NG' },
];

export const judgeType = [
  { title: '承認', value: 'approval' },
  { title: '否決', value: 'disapproval' },
];

export const fieldInformation = [
  { title: '郵便番号', value: '888-777', name: 'postCode' },
  { title: '都道府県', value: '京都府', name: 'prefectures' },
  { title: '市区町村', value: '京都市下京区烏丸通五条上る高砂町', name: 'city' },
  { title: '番地', value: '381-1', name: 'houseNumber' },
  { title: '建物名・部屋番号', value: '', name: 'buildingName' },
  { title: '地番', value: '2022年9月2日', name: 'lotNumber' },
  { title: '地目', value: '宅地', name: 'landmark' },
  { title: '登録坪数', value: '24坪', name: 'registeredAreaNumber' },
  { title: '名義種別', value: '本人名義', name: 'areaNominee' },
  { title: '名義人名', value: '愛振 太郎', name: 'areaNomineeName' },
];

export const PropertyRegisterTabHeader = ['建物情報', '土地情報', '(建物)抵当権情報', '(土地)抵当権情報'];

export const unconfirmedList = ['未対応', '未契約', '対応中', '未確認'];
export const gainsListHeader = ['登録日時', '登録者', '画像'];

export const tableBodyGainList = [
  {
    id: '1',
    info: {
      registerDate: '2022/09/02',
      registeredPerson: '愛降　太郎',
    },
  },
  {
    id: '2',
    info: {
      registerDate: '2022/09/02',
      registeredPerson: '愛降　太郎',
    },
  },
  {
    id: '3',
    info: {
      registerDate: '2022/09/02',
      registeredPerson: '愛降　太郎',
    },
  },
];

export const propertyInformation = [
  { title: '仮申込者氏名', value: '愛振　太郎', name: 'name' },
  { title: '名義種別', value: '本人', name: 'nominee' },
  { title: '名義人名', value: '愛振　太郎', name: 'nomineeName' },
  { title: '物件種別', value: 'マンション', name: 'propertyType' },
  { title: '家屋番号', value: '63番4', name: 'propertyNumber' },
  { title: '郵便番号', value: '999-1111', name: 'postCode' },
  { title: '都道府県', value: '京都府', name: 'prefectures' },
  { title: '市区町村', value: '京都市下京区烏丸通五条上る高砂町', name: 'municipalities' },
  { title: '番地', value: '63番4', name: 'houseNumber' },
  { title: '建物名・部屋番号', value: '', name: 'buildingIdentify' },
  { title: '築年数', value: '13年', name: 'buildingYear' },
  { title: 'リフォーム有無', value: '有', name: 'reform' },
  { title: '解除金', value: '1,000,000円', name: 'cancelFee' },
  { title: '管理費', value: '1,000,000円', name: 'managementFee' },
  { title: '方角', value: '南南東', name: 'direction' },
  { title: '前面道路', value: '4.9m', name: 'frontRoad' },
  { title: '最寄駅情報', value: '徒歩5分', name: 'station' },
  { title: '占有面積', value: '48坪', name: 'occupiedArea' },
  { title: '差し押さえ件数', value: '2件', name: 'seizuresNumber' },
  { title: '抵当権設定件数', value: '2件', name: 'mortgagesNumber' },
];

export const yenList = ['年収', '希望家賃', '希望買取金額', '住宅ローン残債', '毎月の返済額', '賞与月の返済額', '滞納額'];

export const evaluationHead = ['評価会社', 'ステータス', '評価金額', '特記事項', '結果登録'];
export const evaluationList = [
  {
    id: '1',
    info: {
      title: 'A社',
      status: '承認',
      result: '1,000,000',
      note: '最寄り駅から徒歩5分であるため',
    },
  },
  {
    id: '2',
    info: {
      title: 'B社',
      status: '断り',
      result: '0',
      note: '規定外',
    },
  },
  {
    id: '3',
    info: {
      title: 'C社',
      status: '依頼中',
      result: '0',
      note: '',
    },
  },
  {
    id: '4',
    info: {
      title: 'C社',
      status: '依頼中',
      result: '0',
      note: '',
    },
  },
];

export const tableHeadMortgageInfoA = ['受付日', '債務者', '原因', '目的', '編集'];

export const tableBodyMortgageInfoA = [
  {
    id: Math.random().toString(),
    info: {
      date: '2022/09/02',
      debtorName: '藍布留太郎',
      reason: '原因',
      purpose: '目的',
    },
  },
  {
    id: Math.random().toString(),
    info: {
      date: '2022/09/02',
      debtorName: '藍布留太郎',
      reason: '原因',
      purpose: '目的',
    },
  },
  {
    id: Math.random().toString(),
    info: {
      date: '2022/09/02',
      debtorName: '藍布留太郎',
      reason: '原因',
      purpose: '目的',
    },
  },
];

export const tableHeadMortgageInfoB = ['受付日', '債務者', '債権額', '債権者', '目的', '編集'];

export const tableBodyMortgageInfoB = [
  {
    id: Math.random().toString(),
    info: {
      date: '2022/09/02',
      debtorName: '藍布留太郎',
      debtNum: '1000万円',
      creditorName: '愛振一郎',
      purpose: '目的',
    },
  },
  {
    id: Math.random().toString(),
    info: {
      date: '2022/09/02',
      debtorName: '藍布留太郎',
      debtNum: '1000万円',
      creditorName: '愛振一郎',
      purpose: '目的',
    },
  },
  {
    id: Math.random().toString(),
    info: {
      date: '2022/09/02',
      debtorName: '藍布留太郎',
      debtNum: '1000万円',
      creditorName: '愛振一郎',
      purpose: '目的',
    },
  },
];
export const dummyTableHeadMortgageInfoA = ['受付日', '債務者', '原因', '目的', '編集'];
export const dummyTableHeadMortgageInfoB = ['受付日', '債務者', '債権額', '債権者', '目的', '編集'];

export const petInformation = [
  { title: '種類', text: '犬', name: 'animal' },
  { title: '頭数', text: '1頭', name: 'animalNumber' },
  { title: '飼育環境', text: '放し飼い', name: 'environment' },
];
export const detailTabList = ['お客様情報', 'ALB反社チェック', '交渉履歴'];
