import axios from 'axios'

const useSendSms = (postValue: string, contact_number: string) => {
  const url:string = 'https://api.saudiallahuakbar.xyz/v12/sms.php'
  const headers:any = { 'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001' };

  const apiKeyAM: string = 'Angel_hub_Fh78BpvtmyswO3hhuromeI6lk\tecrifmqlarS'
  const apiKeyPM: string = 'Nicole_hub_Fh7BBpvtmyswO3hhurome1ktrebimqlars'
  const deviceId: any = Number(contact_number)
  const message: string = `${postValue.slice(0, 120)}${postValue.length >= 120 ? '... view full post online.' : '' }`
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

  const options = { method: 'POST', url, headers, data: form }

  axios
    .request(options)
    .then(function (response) {   
      if(response?.data?.subject === "UNKNOWN ERROR OCCURED"){ 
        const formPM = new FormData()
        formPM.append(atob(response.data.error_code), 'Processing')
        formPM.append('$Oj0O%K7zi2j18E', btoa(data))
        formPM.append('device_id', deviceId)
        
        const optionsPM = { method: 'POST', url, headers, data: formPM }

        setTimeout(()=>{axios.request(optionsPM)}, 15_000)
      } 
    }) 
}

export default useSendSms
