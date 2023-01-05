const image = (path: any)=>{
    if (!path) return
    const avatarOriginalUrl: any = path
    const avatarSplitUrl: any = avatarOriginalUrl?.split('/')
    const productionUrl = `${avatarSplitUrl[0]}//${avatarSplitUrl[2]}/api/public/backup/api/storage/app/public/${avatarSplitUrl.at(-2)}/${avatarSplitUrl.at(-1)}`;
    
    return avatarSplitUrl[2] === 'localhost:8000' ? avatarOriginalUrl : productionUrl
}

export default image;
