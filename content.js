var init = function(){
	// console.log(document.head, document.head.appendChild)
	setTimeout(function() {
		if(!document.head) return init();
		enbaleUnseen = true;


		var jsText = `
			window.mtfb_by_vadagon = ${enbaleUnseen.toString()};
			window.addEventListener("message", function(t) { 
				t.data && "mtfb-fetch" === t.data.type && (window.mtfb_by_vadagon = t.data.value) 
			}, !1);

			const ab2str = function(t) { 
				const e = new Uint8Array(t); let n = ""; for (let t = 0, r = e.length; t < r; t++) n += String.fromCharCode(e[t]); return n 
			}, str2ab = function(t) { const e = new ArrayBuffer(t.length * Uint8Array.BYTES_PER_ELEMENT),
			            n = new Uint8Array(e); for (let e = 0, r = t.length; e < r; e++) n[e] = t.charCodeAt(e); return e 
			}, OrigWebSocket = window.WebSocket, callWebSocket = OrigWebSocket.apply.bind(OrigWebSocket);

			let wsAddListener = OrigWebSocket.prototype.addEventListener;
			wsAddListener = wsAddListener.call.bind(wsAddListener);
			window.WebSocket = function t(e, n) {
				let r; return r = this instanceof t ? 1 === arguments.length ? new OrigWebSocket(e) : arguments.length >= 2 ? new OrigWebSocket(e, n) : new OrigWebSocket : callWebSocket(this, arguments), r 
			}.bind();
			window.WebSocket.prototype = OrigWebSocket.prototype;
			window.WebSocket.prototype.constructor = window.WebSocket;
			let wsSend = OrigWebSocket.prototype.send;
			wsSend = wsSend.apply.bind(wsSend);
			const a = new Uint8Array([108, 97, 115, 116, 95, 114, 101, 97, 100, 95, 119, 97, 116, 101, 114, 109, 97, 114, 107, 95, 116, 115]),
			    b = new Uint8Array([108, 97, 115, 116, 95, 114, 101, 97, 100, 95, 119, 97, 116, 101, 114, 109, 97, 114, 107, 95, 99, 115]),
			    x = new Uint8Array([105, 115, 95, 116, 121, 112, 105, 110, 103]),
			    y = new Uint8Array([110, 111, 95, 116, 121, 112, 105, 110, 103]),
			    bt = ab2str(x),
			    nt = ab2str(y),
			    bs = ab2str(a),
			    ns = ab2str(b);

			OrigWebSocket.prototype.send = function(t) {
				if (window.mtfb_by_vadagon) { 
					const e = ab2str(t);
	        		if(${data.block_typing_indicator.toString()} && e.match(/is_typing([\\\\]*)":/g)){
	        			t = str2ab(e.replace(bt, nt))
	        		}
	        		if(${data.block_chat_seen.toString()} && e.match(/last_read_watermark_ts([\\\\]*)":/)){
	        			t = str2ab(e.replace(bs, ns));
	        		}
	        	} 
	        	return wsSend(this, arguments) 
	        };
		`
		var script = document.createElement("script");
		script.textContent = jsText;
		document.head.appendChild(script);


		// const n = document.createElement("script");
		
		// n.src = window.URL.createObjectURL(new Blob(['console.log(1232222211111)']), { type: "application/javascript" })
		// console.log(n.src)
		// (document.head || document.documentElement).appendChild(n)
		// script.onload = function() { 
		// 	this.parentNode.removeChild(this) 
		// }
	}, 1);	
}

var data = {};

chrome.storage.sync.get((e)=>{
	data = e
	if(!data.fbunseen_messenger && window.location.href.includes('messenger.com')){

	}else{
		init() 
	}
})


chrome.storage.onChanged.addListener(e => {
	window.location.reload()
})




