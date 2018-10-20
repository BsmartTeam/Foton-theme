
const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
class flyBlock{
    constructor(id,cls,speed){
        Object.assign(this, {id,cls});
        this.speed = speed == 'fast' ?  0.05 : 0.02 ; // pixels
        this.lastY = $(window).scrollTop(); 
    }
    render(toid,tocls){
        $(`#${toid} .${tocls}`).append( $('<div>').attr('id',this.id).addClass(`${this.cls}`) )
        this.height = $(`#${this.id}`).height();
        this.marginTop = parseInt($(`#${this.id}`).css('margin-top')),
        $(window).scroll((e)=>{  this.levitate() }); //auto start levitate after rendering
    }
    pos_top(){ return document.getElementById(this.id).getBoundingClientRect().top }
    setTime(){ this.timeout = setTimeout(()=>{clearInterval(this.interval)},300 )}
    startMove(dir){
        if(dir){  $(`#${this.id}`).css('margin-top',`${this.marginTop -= this.speed}px`)}
        else{  $(`#${this.id}`).css('margin-top',`${this.marginTop += this.speed}px`)};
    }
    levitate(){
        this.currY = $(window).scrollTop();
        if( (this.pos_top() <= windowHeight) && ((this.pos_top() + this.height ) >= 0)){
            clearInterval(this.interval);
            clearTimeout(this.timeout);
            let dir = this.currY > this.lastY; // true move up, false move down
            this.interval =  setInterval(()=>{ this.startMove( dir ) },1);
            this.setTime();            
        }
		this.lastY = this.currY;
    } 
}


let block_sm_1 = new flyBlock('fly-block-sm-1','fly-block fly-fast', 'fast');
let block_bg_1 = new flyBlock('fly-block-big-1','fly-block fly-slow', 'slow');
let block_sm_2 = new flyBlock('fly-block-sm-2','fly-block fly-fast', 'fast');
let block_bg_2 = new flyBlock('fly-block-big-2','fly-block fly-slow', 'slow');
document.body.onload = ()=>{
    block_sm_1.render('sales_report', 'fly-blocks-holder');
    block_bg_1.render('sales_report', 'fly-blocks-holder');
    block_sm_2.render('keep-trak', 'fly-blocks-holder');
    block_bg_2.render('keep-trak', 'fly-blocks-holder');
}
