function awaitOperation(client, id) {
	return new Promise(async (resolve, reject) => {
		var s = setTimeout(() => {
			reject("Operation didnt finish in time.");
		}, 150000);
		try {
			var ws = await client.events();
			/**
			 *
			 * @param {import('ws').MessageEvent} datam
			 * @returns
			 */

			ws.addEventListener("message", function waitForSuccess(datam) {
				var datap = JSON.parse(datam.data.toString());
				//console.log(datap)
				if (!datap.metadata.id || !datap.metadata.status) return;
				if (datap.metadata.id == id && datap.metadata.status == "Success") {
					terminate();
				}
			});
			function terminate() {
				ws.removeAllListeners("message");
				ws.rm();
				ws.terminate();
				resolve();
				clearTimeout(s)
			}
		} catch (error) {
			reject(error);
		}
	});
}
module.exports = awaitOperation;
