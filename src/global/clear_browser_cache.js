const delete_cache=()=>{
    if('caches' in window){
      caches.keys().then((names) => {
              // Delete all the cache files
              names.forEach(name => {
                  caches.delete(name);
              })
          });
      }
    }

    export default delete_cache;