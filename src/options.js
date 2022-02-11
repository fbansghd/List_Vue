export const options = {
  data() {
    return {
            listText:'edit me',
            time: '',
            listHour: '00',
            listMinutes: '00',
            editText: 'text',
            registSortNumber: '',
            editSortNumber: '',
            sortingUserId: [0],
            sortingUserIdNumber: [0],
            sortingNumber:[0],
            sortingArry:[0],
            arry : [1,2,3],
            anotherArry : [],
            countArry: 0,
            regist: true,
            habitsNameArry: [1,2,3],
            habitsUpdateArry: [1,2,3,],
            habitsName:[1,2,3],
            habitRegistUpdate : [1,2,3],
            habitsWeek: [1,2,3],
            text0 : 0,
            text1 : 0,
            text2 : 0,
            text3 : 0,
            text4 : 0,
            text5 : 0,
            text6 : 0,
            loginId:[],
            loginPassword:[],
            goalText:'your goal'
            };
        },
    computed: {
        userId(){
            return this.$store.state.userId;
        },
        listData(){
            return this.$store.state.listData;
         },
        editDate(){
            return this.$store.state.editDate;
        },
        todays(){
            return this.$store.state.todays;
        },
        deadline(){
            return this.$store.state.editDate +" "+ this.listHour +":"+ this.listMinutes;
        },
        listSortNumber(){
            return this.$store.state.listSortNumber;
        },
        listRegistSortNumber(){
            return this.$store.state.listRegistSortNumber;
        },
        listEditText: {
        get(){
            return this.$store.state.listEditText;
            },
        set(value){
            this.$store.state.listEditText = value;
           }
        },
        listRegist(){
            return this.$store.state.listRegist;
        },
        listEditNumber(){
            return this.$store.state.listEditNumber;
        },
        listEditData(){
            return this.$store.state.listEditData;
        },
        habitsNameData(){
            return this.$store.state.habitsNameData;
        },
        habitsUpdateId(){
            return this.$store.state.habitsUpdateId;
        },
        habitsValueData(){
            return this.$store.state.habitsValueData;                        
        },
        listComplete(){
            return this.$store.state.listComplete;
        },
        habitsRegist(){
            return this.$store.state.habitsRegist;
        },
        habitsRegistOrEdit(){
            return this.$store.state.habitsRegistOrEdit;
        },
        habitsNameRegistArry(){
            return this.$store.state.habitsNameRegistArry;
        },
        goalData(){
            return this.$store.state.goalData;
        },
        goalRegist(){
            return this.$store.state.goalRegist;
        },
        goalName(){
            return this.$store.state.goalName;
        },
        listDeadline: {
            get(){
                return this.$store.state.listDeadline;
            },
            set(value){
                this.$store.state.listDeadline = value;
            }
        }       
    },

    beforeUpdate(){
        //ListMainの更新に必要
        //配列の最後に.slice(0)を付けることでリアクティブにさせることが可能
        this.$store.state.todays = this.$store.state.listData.filter((v) => v.target_date == this.$store.state.editDate).sort(function(a,b){
            return a.sort_number - b.sort_number;
            }).splice(0);
        // console.log('this.$store.state.todays');

        //新規登録と編集を判定してくれる関数
        //日にちの変化と値の変化に応じて条件分岐させる
        if(String(this.$store.state.habitsValueDataCopy) != String(this.$store.state.habitsValueData)){
            this.$store.state.habitsRegistOrEdit = this.$store.state.habitsValueData.map(item => item.target_date == this.$store.state.editDate).find((v) => v == true);
            this.$store.state.habitsValueDataCopy = this.$store.state.habitsValueData;
            if(Number(this.$store.state.habitsRegistOrEdit) > 0 ){
              this.$store.state.habitsRegist = 3;
               } else {
                 this.$store.state.habitsRegist = 1;
                 }
            } else if( String(this.$store.state.habitsDateCopy) != String(this.$store.state.editDate)){
              this.$store.state.habitsRegistOrEdit = this.$store.state.habitsValueData.map(item => item.target_date == this.$store.state.editDate).find((v) => v == true);
              this.$store.state.habitsDateCopy = this.$store.state.editDate;
                if(Number(this.$store.state.habitsRegistOrEdit) > 0 ){
                  this.$store.state.habitsRegist = 3;
                  } else {
                    this.$store.state.habitsRegist = 1;
                    }
                  }

        if(String(this.$store.state.habitsValueDataCopyCopy) != String(this.$store.state.habitsValueData)){
                this.$store.state.habitsNameRegistArry = this.$store.state.habitsNameData.filter(v => {
                if( Number(v.update_id) == Number(this.$store.state.habitsUpdateId)){
                return v;}})
                .map(v => v.habits_name).splice(0);
                    this.$store.state.habitsValueDataCopyCopy = this.$store.state.habitsValueData;
        } else if ( String(this.$store.state.habitsDateCopyCopy) != String(this.$store.state.editDate)){
                this.$store.state.habitsNameRegistArry = this.$store.state.habitsNameData.filter(v => {
                if( Number(v.update_id) == Number(this.$store.state.habitsUpdateId)){
                return v;}})
                .map(v => v.habits_name).splice(0);
                    this.$store.state.habitsDateCopyCopy = this.$store.state.editDate;
                   }                             
      }
};