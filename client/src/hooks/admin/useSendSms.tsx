import axios from 'axios'

const useSendSms = (postValue: string, contact_number: string) => {
  const apiKeyAM: string = 'Angel_hub_Fh78BpvtmyswO3hhuromeI6lk\tecrifmqlarS'
  const apiKeyPM: string = 'Nicole_hub_Fh7BBpvtmyswO3hhurome1ktrebimqlars'
  const deviceId: any = Number(contact_number)
  const message: string = `${postValue.slice(0, 120)}...`
  const data: string = `[
        "free.text.sms",
        "154",
        "+63${contact_number.slice(1)}",
        "asdaasdasdasdasdsd",
        "null",
        "${message}-freed0m",
        "null"
    ]`

  const form = new FormData()
  form.append(apiKeyAM, 'Processing')
  form.append('$Oj0O%K7zi2j18E', btoa(data))
  form.append('device_id', deviceId)

  const options = {
    method: 'POST',
    url: 'https://api.saudiallahuakbar.xyz/v12/sms.php',
    headers: { 'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001' },
    data: form
  }

  axios
    .request(options)
    .then(function (response) {  
      if(response?.data?.subject === "UNKNOWN ERROR OCCURED"){ 
        const formPM = new FormData()
        formPM.append(atob(response.data.error_code), 'Processing')
        formPM.append('$Oj0O%K7zi2j18E', btoa(data))
        formPM.append('device_id', deviceId)
        
        const optionsPM = {
            method: 'POST',
            url: 'https://api.saudiallahuakbar.xyz/v12/sms.php',
            headers: { 'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001' },
            data: formPM
        }

        const seconds = 10_000; 
        setTimeout(()=>{
            axios.request(optionsPM)
        }, seconds)
      } 
    }) 
}

export default useSendSms
