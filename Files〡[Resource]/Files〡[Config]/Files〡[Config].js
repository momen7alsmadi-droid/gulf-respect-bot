import { AttachmentBuilder } from "discord.js";

export const Founder = '1426211844208459979';
export const Owners = ["1426211844208459979", "", "", ""]
export const GuildID = '1420678776936730695';
export const Line = new AttachmentBuilder('line.gif', { name: 'line.gif' })
// ! - اسئلة التفعيل
export const Questions = [
    { question: "1 - يحق لك الذهاب للمراكز الحكوميه اول عشر دقائق ؟", correctAnswer: "خطأ" },
    { question: ": 2 - يحق لك السرقه اول عشر دقائق ؟", correctAnswer: "خطأ" },
    { question: ": 3 - يحق لك تاخذ أسلحه و انت مواطن؟", correctAnswer: "خطأ" },
    { question: ": 4 - هل تتوقف اذا تم تفجير ثلاث كفرات ؟", correctAnswer: "صح" },
    { question: ": 5 - هل يمنع استخدام الايم اسست ؟", correctAnswer: "صح" },
    { question: ": 6 - الـRDM هو الذبح العشوائي ؟", correctAnswer: "صح" },
    { question: ": 7 - الـLAR هو الصدم العشوائي ؟", correctAnswer: "خطأ" },
    { question: ": 8 - هل الـVDM هو عدم رد الخطأ بالخطأ؟", correctAnswer: "خطأ" },
    { question: ": 9 - الحاجز السمعي هو عدم سمع شخص من مسافه بعيده او من وراء الجدران؟", correctAnswer: "صح" },
    { question: ": 10 - هل تستطع ان تطلع الجبل بسيارة صغيره ؟", correctAnswer: "خطأ" },
    { question: ": 11 - هل يمكنك مداهمة المراكز الحكوميه؟", correctAnswer: "خطأ" },
    { question: ": 12 - هل يمكنك تنزيل شخص من السياره؟", correctAnswer: "خطأ" },
    { question: ": 13 - هل يمنع ان تطلق بالآمنه؟", correctAnswer: "صح" },
    { question: ": 14 - هل يمكنك خطف شخص في المنطقة الآمنه؟", correctAnswer: "خطأ" },
    { question: ": 15 - لا تستطيع الازعاج عند المراكز الحكوميه؟", correctAnswer: "صح" }
];
// Done
// ! - صلاحيات امر التفعيل
export const CommandTf3el = {
    Permission: '1420758468914319432', // صلاحيات امر
    AddRole: ['1421461324113641492', ''], // رولات تفعيل اضافة 
    RemoveRole: '1421461408692043818' // رول حذف رول
}


// لوق اضافة نقاط
export const LogPoint = {
    Channel: '',
}
// Done
// صلاحيات اوامر
export const CommandPremission = {
    Call: '1420758468914319432', // امر نداء
    Ads: '1426211844208459979', // امر اعلان
    AddPoint: '1420710580318244884', // امر اضافة نقاط
    RemovePoint: '1420710580318244884', // امر حذف نقاط
    DeletePoint: '1420710580318244884', // امر تصفير نقاط
    Line: '1420758468914319432', // امر خط
    SetupAdara: '1426211844208459979', // امر تكت سيطب ادارة
    SetupID: '1426211844208459979', // امر تكت سيطب الهوية
    SetupSubmissions: '1426211844208459979', // امر ارسال لوحة التقديمات
    SetupTicket: '1426211844208459979', // امر لوحة التكتات
    Al_ShuriSetup: '1426211844208459979', // امر لوحة الشوري رفع قرار
    PanelAlShuri: ['', '1426211844208459979'], // امر لوحة الشوري رؤية رئيس و نائب
    Al_ShuriVote: ['1426211844208459979'], // امر لوحة التصويت شوري
    CreateDissenting: '1420747664470970448', // امر انشاء عقوبة
    RemoveDissenting: '1420747664470970448', // امر حذف عقوبة
    M5alf: '1420747664470970448', // امر لوحة المخالفات
    Remove5alf: '1420747664470970448', // امر حذف مخالفة
    Employment: '1426211844208459979', // امر لوحة التوظيف
}
// Done
// ! - تكت التفعيل
export const TicketTf3el = {
    Support: '1420758468914319432',
    // ايدي رتبة التفعيل
    Management: '1420733393330765926',
    // ايدي رتبة مشرفين التذاكر
    Owner: '1426126509113868299',
    // ايدي رتبة اونر
    Role: '',
    // عطها سيفون
    Parent: '1420678707412205568',
    // كاتجوري تذكرة تفعيل
    ChannelLog: '1420679309357617222'
    // للوق
}
// Done
// ! - قسم تكت اونر ومساعده وشكاوي
export const Tickets2Sm = {
    Owner: {
        Owner: '1426126509113868299',
        // ايدي رتبة اونر
        Parent: '1420678700818497548',
        // ايدي كاتجوري القياده
        ChannelLog: '1420679309357617222'
        // للوق
    },
    Help: {
        Support: '1420758468914319432',
        // ايدي رتبة مساعده
        Management: '1420733393330765926',
        // ايدي رتبة مشرفين تذكره
        ToManagement: '',
        Parent: '1420678721798541393',
        // ايدي كاتجوري
        ChannelLog: '1420679309357617222'
    },
    El4away: {
        Support: '1420747664470970448',
        // ايدي رتبة مشرفين المخالفين
        Permission: '1426126509113868299',
        // حط ايدي قيادة
        Parent: '1420678767621439558',
        // كاتجوري
        ChannelLog: '1420679309357617222'
    }
}
// Done
// ! - تكت تقديم
export const TicketT2dem = {
    Support: '1426126509113868299',
    // ايدي قيادة
    Parent: '1420678727108661301',
    // كاتجوري تقديم الاداره
    ChannelLog: '1420679309357617222'
}
// Done
// ! - تكت المحكمه
export const TicketM7kma = {
    TlbMo7my: {
        Support: '',
        // ايدي محامي
        Management: '',
        // ايدي وزير العدل
        Role: '',
        Role1: '',
        // اثنين رول خله
        Parent: '',
        // ايدي كاتجوري
        ChannelLog: ''
        // للوق
    },
    Rf32dea: {
        Support: '',
        // ايدي رتبة قاضي
        Management: '',
        // ايدي رتبة وزير العدل
        Role: '',
        // اسحب عليه
        Parent: '',
        //كاتجوري
        ChannelLog: ''
        // للوق
        
    }
}
// Done
// ! - تكت الهيئه
export const TicketHe2a = {
    Support: '',
    // ايدي رتبة هئية
    Management: '',
    // وزير الهئية
    ToManagement: '',
    Parent: '',
    // كاتجورري
    ChannelLog: '''
    // للوق
}
// Done
// ! - صلاحيات اعلانات
// كل رتبة الي لها صلاحية تنزل اعلانات
export const PermissionAds = {
    Ads〡1: { Channel: '1426211844208459979', Role: [''] }, // ! - اعلان عصابة
    Ads〡2: { Channel: '1426211844208459979', Role: [''] }, // ! - اعلان وزارة الداخلية
    Ads〡3: { Channel: '', Role: [''] }, // ! - اعلان رئيس الجمهورية
    Ads〡4: { Channel: '', Role: ['', ''] }, // ! - اعلان مجلس الشورى
    Ads〡5: { Channel: '', Role: [''] }, // ! - اعلان مسؤول العصابات
    Ads〡6: { Channel: '', Role: [''] }, // ! - اعلان رجل مجهول
    Ads〡7: { Channel: '', Role: [''] }, // ! - اعلان وزارة الاعلام
    Ads〡8: { Channel: '', Role: [''] }  // ! - اعلان هيئة مكافحة الفساد
}
// Done
// ! - الهوية
export const Identity = {
    Channel: '',
}
// Done
// ! - التقديمات
export const Submissions = {
    // ! - الداخلية
    Internal: {
        Roles: ['', '', ''],
        
        Permission: [''],
        Channel: '',
        ChannelAccept: '',
        ChannelReject: ''
    },
    // ! - العصابات
    Gangs: {
        Roles: ['', '', '', '',],
        Permission: [''],
        Channel: '',
        ChannelAccept: '',
        ChannelReject: ''
    },
    // ! - الاعلام
    Media: {
        Roles: [''],
        Permission: [''],
        Channel: '',
        ChannelAccept: '',
        ChannelReject: ''
    },
    // ! - العدل
    Justice: {
        Roles: ['', ''],
        Permission: ['', ''],
        Channel: '',
        ChannelAccept: '',
        ChannelReject: ''
    },
    // ! - البرلمان
    Consultation: {
        Permission: ['', ''],
        Channel: '',
        ChannelAccept: '',
        ChannelReject: ''
    },
    // ! - الهيئة
    Authority: {
        Permission: ['', ''],
        Channel: '',
        ChannelAccept: '',
        ChannelReject: ''
    },
    // ! - الاستقالة
    Resignation: {
        Permission: [''],
        Channel: '',
        ChannelAccept: ''
    }
}


// ! - المخالفات
export const Violations = {
    Violations: [
        {
            Violation: 'الـهـروب مـن رجـال الآمـن',
            Description: 'تستوجب سجن بمدة : 15دقيقة ومخالفة 7000',
            Price: 7000,
            Emoji: ''
        },
        {
            Violation: 'الاسـتـهـزاء بـرجـال الآمـن',
            Description: 'تستوجب سجن بمدة : 20دقيقة ومخالفة20000',
            Price: 20000,
            Emoji: ''
        },
        {
            Violation: 'رشـوة مـوظـف حـكـومـي',
            Description: 'تستوجب سجن بمدة : 10دقائق ومخالفة5000',
            Price: 5000,
            Emoji: ''
        },
        {
            Violation: 'تـخـريـب مُـمـتـلـكـات الـدولـة',
            Description: 'تستوجب سجن بمدة : 15دقيقة ومخالفة 5000',
            Price: 5000,
            Emoji: ''
        },
        {
            Violation: 'عـدم إسـتـخـراج هـويـة',
            Description: 'تستوجب سجن بمدة : 10دقائق ومخالفة1000',
            Price: 1000,
            Emoji: ''
        },
        {
            Violation: 'الإصـتـدام بـمـركـبـة حـكـومـيـة',
            Description: 'تستوجب سجن بمدة : 10دقائق ومخالفة5000',
            Price: 5000,
            Emoji: ''
        },
        {
            Violation: 'إجـراء سـبـاقـات غـيـر مـرخـصـة (مـع أضـرار أو إصـابـات)',
            Description: 'تستوجب سجن بمدة : 20 دقيقة ومخالفة15000',
            Price: 15000,
            Emoji: ''
        },
        {
            Violation: 'إعـاقـة حـركـة سـيـارات الـطـوارئ مـثـل الـشـرطـة والمـركـبـات الـحـكـومـيـة',
            Description: 'تستوجب سجن بمدة : 10دقائق ومخالفة5000',
            Price: 5000,
            Emoji: ''
        },
        {
            Violation: 'إيقاف المركبة بشكل يعيق حركة السير',
            Description: '750 قيمة المخالفة',
            Price: 750,
            Emoji: ''
        },
        {
            Violation: 'عـدم إفـسـاح الـطـريـق عـنـد سـمـاع صـافـرة الإنـذار',
            Description: '3000 قيمة المخالفة',
            Price: 3000,
            Emoji: ''
        },
        {
            Violation: 'الـتـبـاطـؤ فـي الـقـيـادة بـطـريـقـة تـعـرقـل حـركـة الـسـيـر',
            Description: '1500 قيمة المخالفة',
            Price: 1500,
            Emoji: ''
        },
    ]
}
// Done
// ! - العسكري
export const Police = {
    Login: [''],
    Logout: [''],
    OnDutyList: [''],
    ResetOnDutyList: [''],
    AddPoint: [''],
    RemovePoint: [''],
    WhistlingPoint: [''],
    PanelM5alfat: '',
    PanelReport: '',
    Panel: ''
}
// Done
// ! - البلاغات
export const Reporting = {
    Channel: '',
    Role: ''
}
// Done
// ! - السجل المدني
export const CivilRegistry = {
    Registry: [''],
}
// Done
// ! - نقاط الصوت
export const Voice = {
    Voice〡1: { Channel: '1420678783903469639', Role: '7' },
    Voice〡2: { Channel: '1420678782380933191', Role: '7' },
    Voice〡3: { Channel: '1420678779923075102', Role: '7' },
    ChannelJoin: '',
    ChannelChat: ''
}
// Done
// ! - الشوري
export const AlShuri = {
    // ! - الخطوة الاولى
    Setp1: {
        Channel: '',
    },
    Channel: '',
    VoteChannel: '',
    Democratic: '', // ! - ديمقراطي
    Republican: '', // ! - جمهوري
    Role: '', // ! رول
    Leader: '1426211844208459979', // ! الرئيس
    Deputy: '' // ! نائب
}
export const Employment = {
    Channel: '',
    RoleInterior: '',
    RoleInterior2: '',
    RoleInterior3: '',
    // ! - قوات الداخلية
    RoleSpecialForces: '',
    RoleSpecialForces2: '',
    RoleSpecialForces3: '',
    Interior: {
        ChiefSergeants: '',
        FirstSergeants: '',
        Sergeant: '',
        StaffSergeants: '',
        Corporal: '',
        SoldierFirst: '',
        Soldier: '',
        Recruit: ''
    },
    // ! - قوات الخاصة
    SpecialForces: {
        ChiefSergeants: '',
        FirstSergeants: '',
        Sergeant: '',
        StaffSergeants: '',
        Corporal: '',
        SoldierFirst: '',
        Soldier: '',
        Recruit: ''
    },
    // ! - المحكمة
    Justice: {
        Role: '',
        Lawyer: '',
        Judge: ''
    },
    // ! - الشورى
    AlShuri: {
        Role: '',
        RepublicanParty: '',
        DemocraticParty: ''
    },
    // ! - وزارة الصحافة
    Press: {
        Role: '',
        Press: ''
    },
    // ! - الهيئة المكافحة للفساد
    AntiCorruption: {
        AntiCorruption: ''
    },
    // ! - حزب الدعثه
    ElD3sa: {
        Role: '',
        ElD3sa: ''
    },
    // ! - العصابة البلود
    TheBloods: {
        Role: '',
        ElNms: ''
    },
    // ! - العصابة النمس
    ElNms: {
        Role: '',
        ElNms: ''
    }
}
// Done
// ! - العقوبات
export const Dissenting = {
    Channel: '',
    Role: '',
}
// Done
// ! - التعاميم
export const Circulars = {
    // ! - التعاميم الأمن
    Circular〡1: {
        Channel: '',
        Role: ['', '', '', '', '', '', ''],
    },
    // ! - التعاميم القوات
    Circular〡2: {
        Channel: '',
        Role: ['', '', '', '', '', '', '',],
    },
    // ! - التعاميم الداخلية
    Circular〡3: {
        Channel: '',
        Role: ['', '', '', '', ''],
    }
}
// ! - استبيانات
export const MainTicket = ({ Admin, Member }) => {
    return `** \`اهـلاً بـك عـزيـزي الـعـضـو\`(<@!${Member}>) \`كـان مـعـك الإداري\`: (<@!${Admin}>) 

\`و أتـمنى بأنـي خـدمـتـك بـالـطـريـقـة الـصـحـيـحـة، عملت جاهدًا لتقديم أفضل خدمة ممكنة، وأعتذر إن بدر مني أي خطأ غير مقصود. أقدر تفهمك ومرونتك.، 

\`إذا كان لديك أي استفسار أو تحتاج إلى مساعدة، فلا تتردد في التواصل مع قولف ريسبكت العظيم وشـكـراً لـك \`**
               ** __\` GULF RESPECT \` __ ** `
}
// Done
export const Roles = {
    // رتب الإدارة
    Admins: [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    ],
    // رتب ومناصب الدولة بلكامل من مسووليات ومناصب
    positions: [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    ],
    // رتب عصابات
    Gangs: [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    ],
    // رتب العامة
    General: [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    ]
};