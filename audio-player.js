(()=>{
const section=document.getElementById('album-player'),audio=document.getElementById('album-audio'),list=document.getElementById('album-tracks'),error=document.getElementById('album-audio-error');
if(!section||!audio||!list)return;
fetch('audio-tracks.json').then(r=>{if(!r.ok)throw new Error('manifest');return r.json()}).then(tracks=>{
 if(!Array.isArray(tracks)||!tracks.length)return;
 const safe=tracks.filter(t=>typeof t.title==='string'&&typeof t.src==='string'&&/^assets\/audio\/[^?#]+\.(mp3|m4a|ogg|wav)$/i.test(t.src)&&!t.src.includes('..'));
 if(!safe.length)return;
 let active=-1;
 safe.forEach((track,index)=>{const li=document.createElement('li'),button=document.createElement('button');button.type='button';button.textContent=track.title;button.addEventListener('click',()=>{error.hidden=true;if(active!==index){audio.src=track.src;active=index;list.querySelectorAll('button').forEach(b=>b.removeAttribute('aria-current'));button.setAttribute('aria-current','true');}audio.play().catch(()=>{error.hidden=false})});li.append(button);list.append(li)});
 audio.addEventListener('error',()=>{error.hidden=false});section.hidden=false;
}).catch(()=>{});
})();
