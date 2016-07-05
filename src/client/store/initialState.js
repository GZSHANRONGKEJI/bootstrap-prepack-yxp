export default {
    inboundData: {
        CustomeData: {
            accountid: '',
            businesstype: '',
            name: '',
            IntentionCity: '',
            phone1: '',
            remark: '',
            customertype: '',
            savestate: '1',
            cuestage: '0'
        },
        LargeArea: []
    },
    ProblemRecord: {
        list: [],
        Record: {
            No: '',
            Id: '',
            Theme: '',
            QuestionTypeNameStr: '',
            QuestionType: '',
            QuestionTypeName: '',
            QuestionType1: '',
            QuestionTypeName1: '',
            QuestionType2: '',
            QuestionTypeName2: '',
            CustomerCategory: '',
            Processingmode: '',
            LargeArea: '',
            VisitTime: '',
            ReturnVisit: '',
            ProblemDescription: '',
            Feedback: '',
            State: 0
        },
        RecordEmpty: {
            No: '',
            Id: '',
            Theme: '',
            QuestionTypeNameStr: '',
            QuestionType: '',
            QuestionTypeName: '',
            QuestionType1: '',
            QuestionTypeName1: '',
            QuestionType2: '',
            QuestionTypeName2: '',
            CustomerCategory: '',
            Processingmode: '',
            LargeArea: '',
            VisitTime: '',
            ReturnVisit: '',
            ProblemDescription: '',
            Feedback: '',
            State: 0
        },
        LargeArea: [],
        OppList: []
    },
    Option: {
        accounttype:[
            {value :0, text:'4S店商家'},
            {value :1, text:'非4S店商家'},
            {value :2, text:'个人经纪公司'},
            {value :3, text:'个人消费者'}
        ],
        cuestage:[
            {value :0, text:'新线索'},
            {value :1, text:'潜在客户'},
            {value :2, text:'意向客户'},
            {value :3, text:'无效客户'}
        ],
        sellertype: [
            {
                value: 905290000,
                text: '传统型'
            },
            {
                value: 905290001,
                text: '进取型'
            },
            {
                value: 905290002,
                text: '优置换'
            },
            {
                value: 905290003,
                text: '现场拍'
            }
        ],
        followresultList: [
            {
                value: 905290000,
                text: '意向'
            },
            {
                value: 905290001,
                text: '潜在'
            },
            {
                value: 905290002,
                text: '无效'
            },
            {
                value: 905290003,
                text: '其他'
            }
        ],
        sex: [
            {
                value: 0,
                text: '男'
            },
            {
                value: 1,
                text: '女'
            }
        ],
        businesstype: [
            {
                value: 0,
                text: '优信拍'
            },
            {
                value: 1,
                text: '二手车'
            }
        ],
        customertype: [
            {
                value: 0,
                text: '买家'
            },
            {
                value: 1,
                text: '卖家'
            },
            {
                value: 2,
                text: '消费者'
            }
        ],
        clientclass: [
            {
                value: 0,
                text: '优信拍买家'
            },
            {
                value: 1,
                text: '优信拍卖家'
            },
            {
                value: 2,
                text: '东风日产买家'
            },
            {
                value: 3,
                text: '东风日产卖家'
            },
            {
                value: 4,
                text: '一汽大众买家'
            },
            {
                value: 5,
                text: '一汽大众卖家'
            },
            {
                value: 6,
                text: '广汽三菱买家'
            },
            {
                value: 7,
                text: '广汽三菱卖家'
            },
            {
                value: 8,
                text: '克莱斯勒卖家'
            },
            {
                value: 9,
                text: '其他项目买家'
            },
            {
                value: 10,
                text: '其他项目卖家'
            },
            {
                value: 11,
                text: '非会员买家'
            },
            {
                value: 12,
                text: '非会员卖家'
            },
            {
                value: 13,
                text: '非会员'
            }
        ],
        processingmode: [
            {
                value: 0,
                text: '自主解决'
            },
            {
                value: 1,
                text: '问题分配'
            },
            {
                value: 2,
                text: '待客户补充资料'
            }
        ],
        IntentionCity: [
            {
                value: 0,
                text: '北京'
            },
            {
                value: 1,
                text: '上海'
            },
            {
                value: 2,
                text: '成都'
            },
            {
                value: 3,
                text: '天津'
            },
            {
                value: 4,
                text: '广州'
            },
            {
                value: 5,
                text: '杭州'
            },
            {
                value: 6,
                text: '武汉'
            },
            {
                value: 7,
                text: '深圳'
            }
        ],
        callTimeOptionList: [
            {
                value: 0,
                text: '本周内'
            },
            {
                value: 1,
                text: '本月内'
            },
            {
                value: 2,
                text: '三个月内'
            },
            {
                value: 3,
                text: '三个月以上'
            }
        ],
        callType: [
            {
                value: 0,
                text: '呼入'
            },
            {
                value: 1,
                text: '呼出'
            }
        ],
        resolutionstate: [
            {
                value: 1,
                text: '未解决'
            },
            {
                value: 2,
                text: '已解决'
            },
            {
                value: 3,
                text: '无法确定'
            }
        ],
        completionstate:[
            {
                value: 905290001,
                text: '未完成'
            },
            {
                value: 905290000,
                text: '完成'
            }
        ],
        questionCategory: [
            {
                text: '咨询类',
                value: '3CB00967-A3AE-E511-80C1-00155DC96413',
                menu: [{
                    text: '业务/服务咨询',
                    value: 'E79ECCB6-8CB2-E511-80C1-00155DC96413',
                    menu: [
                        {
                            text: '优信拍加入咨询',
                            'value': '5A8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            text: '平台使用咨询',
                            'value': '5C8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            text: '查客问题咨询',
                            'value': '5E8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            text: '手机客户端咨询',
                            'value': '608E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            text: '积分问题咨询',
                            'value': '628E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            text: '交易',
                            'value': '648E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            text: '保证金咨询',
                            'value': '668E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            text: '仲裁咨询',
                            'value': '688E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            text: '现场拍咨询',
                            'value': '6A8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            text: '现场拍优惠活动咨询',
                            'value': '6C8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            text: '其他优惠活动咨询',
                            'value': '6E8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            text: '其他咨询',
                            'value': '708E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            text: '优信二手车问题',
                            'value': '728E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            text: '金融问题',
                            'value': '748E16EF-8DB2-E511-80C1-00155DC96413'
                        }
                    ]
                }]
            },
            {
                text: '问题求助类',
                value: 'E9C76A8C-8CB2-E511-80C1-00155DC96413',
                menu: [
                    {
                        text: '平台/查客',
                        'value': 'A3491CC8-8CB2-E511-80C1-00155DC96413',
                        menu: [
                            {
                                text: '拍品信息有误',
                                'value': '768E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '保证金异常',
                                'value': '788E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '无法登录平台',
                                'value': '7A8E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '平台使用异常',
                                'value': '7C8E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '手机客户端问题',
                                'value': '7E8E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '无法登陆查客',
                                'value': '808E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '查客使用异常',
                                'value': '828E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '手机短信问题',
                                'value': '848E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '会员积分问题',
                                'value': '868E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '无法注册会员',
                                'value': '888E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '买家支付车款异常',
                                'value': '8A8E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '审核会员异常',
                                'value': '8C8E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '置换平台异常',
                                'value': '8E8E16EF-8DB2-E511-80C1-00155DC96413'
                            }
                        ]
                    },
                    {
                        text: '售后/仲裁',
                        'value': 'DFDE26D0-8CB2-E511-80C1-00155DC96413',
                        menu: [
                            {
                                text: '验车付款',
                                'value': '908E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '过户手续办理',
                                'value': '928E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '提车纠纷',
                                'value': '948E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '车款问题',
                                'value': '968E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '发起仲裁',
                                'value': '988E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '催促仲裁',
                                'value': '9A8E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '对仲裁不满',
                                'value': '9C8E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '其他售后问题',
                                'value': '9E8E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '过户押金争议',
                                'value': 'A08E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '车内物品丢失/亏油',
                                'value': 'A28E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '伙伴圈交易删除',
                                'value': 'A48E16EF-8DB2-E511-80C1-00155DC96413'
                            }
                        ]
                    },
                    {
                        text: '售前/现场拍',
                        'value': 'A09FCDD9-8CB2-E511-80C1-00155DC96413',
                        menu: [
                            {
                                text: '竞拍问题',
                                'value': 'A68E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '交易问题',
                                'value': 'A88E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                text: '其他现场拍问题',
                                'value': 'AA8E16EF-8DB2-E511-80C1-00155DC96413'
                            }
                        ]
                    }
                ]
            },
            {
                'text': '投诉类',
                'value': 'ADBC9097-8CB2-E511-80C1-00155DC96413',
                'menu': [
                    {
                        'text': '客户投诉',
                        'value': 'E509E9EB-8CB2-E511-80C1-00155DC96413',
                        'menu': [
                            {
                                'text': '员工服务投诉',
                                'value': 'AC8E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                'text': '售后交付流程投诉',
                                'value': 'AE8E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                'text': '业务办理投诉',
                                'value': 'B08E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                'text': '平台查客使用投诉',
                                'value': 'B28E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                'text': '仲裁投诉',
                                'value': 'B48E16EF-8DB2-E511-80C1-00155DC96413'
                            },
                            {
                                'text': '其他投诉',
                                'value': 'B68E16EF-8DB2-E511-80C1-00155DC96413'
                            }
                        ]
                    },
                    {
                        'text': '建议意见',
                        'value': '099CB4F3-8CB2-E511-80C1-00155DC96413',
                        'menu': [{
                            'text': '建议意见',
                            'value': 'B88E16EF-8DB2-E511-80C1-00155DC96413'
                        }]
                    }
                ]
            },
            {
                'text': '查询申请类',
                'value': 'ADBC9097-8CB2-E511-80C1-00155DC96413',
                'menu': [{
                    'text': '报备/申请/查询',
                    'value': '79D93E0B-8DB2-E511-80C1-00155DC96413',
                    'menu': [
                        {
                            'text': '初始化密码',
                            'value': 'BA8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '修改账户信息',
                            'value': 'BC8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '加入优信拍申请',
                            'value': 'BE8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '账号重启',
                            'value': 'C08E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '加入优信拍催促',
                            'value': 'C28E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '积分礼品问题',
                            'value': 'C48E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '活动申请报备',
                            'value': 'C68E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '退保登记',
                            'value': 'C88E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '退保进度查询',
                            'value': 'CA8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '汇保查询',
                            'value': 'CC8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '客户经理',
                            'value': 'CE8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '查客押金/沟通/更换',
                            'value': 'D08E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '汇车款问题/购买问题',
                            'value': 'D28E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '发票',
                            'value': 'D48E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '物流问题/收据问题',
                            'value': 'D68E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '伙伴圈申请加入',
                            'value': 'D88E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '伙伴圈申请取消',
                            'value': 'DA8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '账号关闭',
                            'value': 'DC8E16EF-8DB2-E511-80C1-00155DC96413'
                        },
                        {
                            'text': '催促审核',
                            'value': 'DE8E16EF-8DB2-E511-80C1-00155DC96413'
                        }
                    ]
                }]
            }
        ]
    },
    QuestionHistory: {
        itemData: [],
        query: {
            pagesize: 10,
            currentpage: 1
        },
        item: {
            head: [
                '编号',
                '主题',                
                '来电号码',
                '处理人',
                '问题处理方式',
                '问题描述',
                '问题反馈',
                '问题解决状态',
                '操作'
            ],
            list: [
                'no',
                'questionname',
                'phonenumber',
                'owneridName',
                'processingmodeOpt',
                'problemdescription',
                'feedback',
                'problemstate',
                'operation'
            ]
        }
    },
    CallRecords: {
        itemData: [],
        query: {
            pagesize: 10,
            currentpage: 1
        },
        item: {
            head: [
                '来电类型',
                '来电号码',
                '来电时间',
                '坐席工号',
                '坐席姓名',
                '接听状态'
            ],
            list: [
                'directioncode',
                'phonenumber',
                'calltime',
                'xin_cccid',
                'xin_cccname',
                'xin_phonecallanswerstatus'
            ]
        }
    },
    CustomerVip: {
        query: {
            phone: '',
            branchoffice: '',
            usephone: '',
            state: 0
        },
        item: {
            head: [
                '会员编号',
                {value:'登录名',style: { width:'150px'}},
                '客户名称',
                '身份证/营业执照',
                '类型',
                '会员级别',
                '分公司',
                '注册名',
                '联系电话',
                '客户状态'
            ],
            list: [
                'subject',
                {value:'loginname', type:'truncate', style:{ width:'130px' }},
                'membername',
                'idnumber',
                'businesstype',
                'memberlevelName',
                'branchofficeName',
                'contacts',
                'contactstel',
                'oppstatus'
            ]
        },
        itemData: []
    },
    VisitPlan: {
        query: {
            visittime: null
        },
        queryEmpty: {
            No: '',
            visittime: null,
            description: '',
            phonenumber: ''
        },
        itemData: []
    },
    inboundProblemFeedback: {
        item: {}
    },
    salesFollowTaskTab: {
        item: {
            name: '',
            content: '',
            followresult: '',
            accountid: '',
            businesstype: '',
            theme: '',
            IntentionCity: '',
            phone1: '',
            remark: '',
            customertype: '',
            savestate: '1',
            cuestage: '0',
            emailaddress1: '',
            address: '',
            isconversion: true

        },
        LargeArea: []
    },
    MemberInfoTab: {
        field: [
            {
                'value': 'xin_name',
                'text': '客户名称'
            },
            {
                'value': 'xin_memberabb',
                'text': '会员简称'
            },
            {
                'value': 'xin_contacts',
                'text': '联系人'
            },
            {
                'value': 'xin_contactstel',
                'text': '联系电话'
            },
            {
                'value': 'xin_phone1',
                'text': '手机号码1'
            },
            {
                'value': 'xin_phone2',
                'text': '手机号码2'
            },
            {
                'value': 'xin_phone3',
                'text': '手机号码3'
            },
            {
                'value': 'xin_idnumber',
                'text': '身份证号'
            },
            {
                'value': 'xin_organization',
                'text': '组织机构代码证'
            },
            {
                'value': 'xin_businesslicense',
                'text': '营业执照号'
            },
            {
                'value': 'xin_certificate',
                'text': '税务登记证'
            },
            {
                'value': 'xin_province',
                'text': '所属省份',
                'list': 'province',
                'type': 'dropdown'
            },
            {
                'value': 'xin_city',
                'text': '所属城市',
                'list': 'city',
                'type': 'dropdown'
            },
            {
                'value': 'xin_branchoffice',
                'text': '所属分公司',
                'list': 'LargeArea',
                'type': 'dropdown'
            },
            {
                'value': 'xin_needcity',
                'text': '意向业务城市',
                'list': 'LargeArea',
                'type': 'dropdown'
            },
            {
                'value': 'xin_carcity2',
                'text': '意向业务城市2',
                'list': 'LargeArea',
                'type': 'dropdown'

            },
            {
                'value': 'xin_carcity3',
                'text': '意向业务城市3',
                'list': 'LargeArea',
                'type': 'dropdown'
            },
            {
                'value': 'xin_address',
                'text': '地址'
            },
            {
                'value': 'xin_businesstype',
                'text': '业务类型',
                'list': 'businesstype',
                'type': 'dropdown'
            },
            {
                'value': 'xin_customertype',
                'text': '会员类型',
                'list': 'customertype',
                'type': 'dropdown'
            },
            {
                'value': 'xin_sellertype',
                'text': '卖家类型',
                'list': 'sellertype',
                'type': 'dropdown'
            },
            {
                'value': 'xin_followresult',
                'text': '清洗结果',
                'list': 'completionstate',
                'type': 'dropdown'
            },
            {
                'value': 'xin_remark',
                'text': '备注',
                'className': 'col-xs-5',
                'end': true
            },
            {
                'value': 'xin_membername',
                'text': '会员ID',
                'disabled': true
            },
            {
                'value': 'xin_createresource',
                'text': '会员创建来源',
                'disabled': true
            },
            {
                'value': 'xin_memberlevel',
                'text': '会员级别',
                'end': true,
                'disabled': true
            },
            {
                'value': 'xin_salesof',
                'text': '所属销售',
                'disabled': true

            },
            {
                'value': 'OwnerId',
                'text': '会员所属',
                'disabled': true
            },
            {
                'value': 'xin_deliverymanager',
                'text': '客服经理',
                'disabled': true
            },
            {
                'value': 'xin_currentbond',
                'text': '当前保证金',
                'disabled': true
            },
            {
                'value': 'xin_currentfrozenbond',
                'text': '当前冻结保证金',
                'disabled': true
            },
            {
                'value': 'xin_marginextracted',
                'text': '可提取保证金',
                'disabled': true
            },
            {
                'value': 'xin_virtualbond',
                'text': '虚拟保证金',
                'disabled': true
            },
            {
                'value': 'xin_registration',
                'text': '注册时间',
                'disabled': true
            },
            {
                'value': 'xin_flandingtime',
                'text': '首次登录时间',
                'disabled': true
            },
            {
                'value': 'xin_contracttime',
                'text': '签约时间',
                'disabled': true
            },
            {
                'value': 'xin_frechargetime',
                'text': '首次充值时间',
                'disabled': true
            },
            {
                'value': 'xin_fclosingtime',
                'text': '首次成交时间',
                'disabled': true
            },
            {
                'value': 'xin_integra',
                'text': '积分',
                'disabled': true
            }
        ],
        item: {},
        LargeArea: [],
        province: [],
        city: []
    },
    
};