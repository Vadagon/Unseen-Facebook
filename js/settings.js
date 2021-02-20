class UnseenPopup{
    constructor(){
        chrome.storage.sync.get(null, function (settings) {
            this.settings = settings;
            this.init()
        }.bind(this))
    }
    init(){
        chrome.runtime.sendMessage({action: 'getSettings'}, function (response) {
            $("#block_chat_indicator").attr('checked', response.block_chat_indicator);
            $("#block_chat_receipts").attr('checked', response.block_chat_receipts);
            $("#block_chat_seen").attr('checked', response.block_chat_seen);
            $("#block_typing_indicator").attr('checked', response.block_typing_indicator);
            $("#fbunseen_messenger").attr('checked', response.fbunseen_messenger);
            $("#show_mark_as_read").attr('checked', response.show_mark_as_read);

        }.bind(this));

        $(document).on('change', 'input.checkbox', function (e) {
            let id = $(e.target).attr('id'),
                state = e.target.checked;
            switch (id) {
                case "block_chat_seen":
                    this.set_icon(state);
                    break;
                case "fbunseen_messenger":
                    this.changeMessengerPermissions(state);
                    break;
            }

            let obj = {},
                k = id;
            obj[k] = state;
            chrome.storage.sync.set(obj);


        }.bind(this));


        console.log(this.settings)
        $('#paymentScreen').hide();

        if(!this.settings.isPaid) 
            $('table').click((event)=>{
                if(!this.settings.isPaid){
                    event.preventDefault();
                    $('#paymentScreen').show()
                }
            })

        if(!this.settings.isPaid){
            $('.unseenfooterStars').hide()
        }

        $('#paymentScreen > a')[0].href=`https://us-central1-extensions-uni.cloudfunctions.net/way4pay/payWithId/${this.settings.uid}?productName=Unseen%20Messenger&amount=1.99`
        $.get('https://us-central1-extensions-uni.cloudfunctions.net/main/getUserByEmail/'+this.settings.uid).done(()=>{
            this.settings.isPaid = true;
            $('.unseenfooterStars').show()
            chrome.storage.sync.set({isPaid: true});
        })

    }

    set_icon(state) {
        if (state) {
            chrome.runtime.sendMessage({action: 'quickEnable'})
        } else {
            chrome.runtime.sendMessage({action: 'quickDisable'})
        }
    }

    changeMessengerPermissions(state) {
        if (state) {
            chrome.runtime.sendMessage({action: 'addMessenger'});
        } else {
            chrome.runtime.sendMessage({action: 'removeMessenger'});
        }
    }

}
// $.get('https://us-central1-extensions-uni.cloudfunctions.net/main/getUserByEmail/'+user.USER_ID)


 $(function () {
     new UnseenPopup();
 });

    

// https://us-central1-extensions-uni.cloudfunctions.net/way4pay/payWithId/assass?productName=Unseen%20Messenger&amount=8.99

