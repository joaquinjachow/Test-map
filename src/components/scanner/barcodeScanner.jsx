import { useEffect } from 'react';
import Quagga from 'quagga';

function BarcodeScanner() {
  useEffect(() => {
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#barcode-scanner'),
      },
      decoder : {
        readers : ["ean_reader"]
      }
    }, function(err) {
        if (err) {
            console.error(err);
            return
        }
        console.log("QuaggaJS initilized successfully!");
        Quagga.start();
        Quagga.onDetected(function(result) {
          var code = result.codeResult.code;
          console.log("Barcode detected: " + code);
      });
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div id="barcode-scanner" style={{ width: '100%', height: '100%' }}>
      {/* Vista previa de la cámara */}
    </div>
  );
}

export default BarcodeScanner;
