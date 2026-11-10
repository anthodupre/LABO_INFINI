/* Three.js r170 (licence MIT, © 2010-2024 three.js authors) + EffectComposer, UnrealBloomPass, OutputPass, mergeGeometries.
   Fichier GÉNÉRÉ par tools/vendor.js : ne pas modifier à la main. */
(()=>{var qp=Object.defineProperty;var Yp=(s,t)=>{for(var e in t)qp(s,e,{get:t[e],enumerable:!0})};var Hu={};Yp(Hu,{ACESFilmicToneMapping:()=>Xl,AddEquation:()=>ri,AddOperation:()=>ep,AdditiveAnimationBlendMode:()=>Uu,AdditiveBlending:()=>dr,AgXToneMapping:()=>ql,AlphaFormat:()=>Cu,AlwaysCompare:()=>vp,AlwaysDepth:()=>Qa,AlwaysStencilFunc:()=>eh,AmbientLight:()=>Pl,AnimationAction:()=>kl,AnimationClip:()=>$i,
AnimationLoader:()=>Dh,AnimationMixer:()=>Jh,AnimationObjectGroup:()=>Zh,AnimationUtils:()=>Ry,ArcCurve:()=>$o,ArrayCamera:()=>Fo,ArrowHelper:()=>xu,AttachedBindMode:()=>th,Audio:()=>Bl,AudioAnalyser:()=>qh,AudioContext:()=>$r,AudioListener:()=>Wh,AudioLoader:()=>Hh,AxesHelper:()=>vu,BackSide:()=>ke,
BasicDepthPacking:()=>hp,BasicShadowMap:()=>Kp,BatchedMesh:()=>Xo,Bone:()=>Pr,BooleanKeyframeTrack:()=>Yn,Box2:()=>ru,Box3:()=>Ce,Box3Helper:()=>gu,BoxGeometry:()=>ki,BoxHelper:()=>mu,BufferAttribute:()=>Qt,BufferGeometry:()=>Ft,BufferGeometryLoader:()=>Ol,ByteType:()=>Tu,Cache:()=>zn,Camera:()=>Rs,
CameraHelper:()=>pu,CanvasTexture:()=>Ah,CapsuleGeometry:()=>nl,CatmullRomCurve3:()=>Ko,CineonToneMapping:()=>Wl,CircleGeometry:()=>il,ClampToEdgeWrapping:()=>nn,Clock:()=>Ns,Color:()=>ot,ColorKeyframeTrack:()=>qr,ColorManagement:()=>qt,CompressedArrayTexture:()=>Th,CompressedCubeTexture:()=>wh,CompressedTexture:()=>Ps,
CompressedTextureLoader:()=>Lh,ConeGeometry:()=>sl,ConstantAlphaFactor:()=>Qd,ConstantColorFactor:()=>$d,Controls:()=>Mu,CubeCamera:()=>Uo,CubeReflectionMapping:()=>Wn,CubeRefractionMapping:()=>oi,CubeTexture:()=>Vi,CubeTextureLoader:()=>Uh,CubeUVReflectionMapping:()=>Fs,CubicBezierCurve:()=>Lr,CubicBezierCurve3:()=>Qo,
CubicInterpolant:()=>El,CullFaceBack:()=>Kc,CullFaceFront:()=>Ud,CullFaceFrontBack:()=>$p,CullFaceNone:()=>Ld,Curve:()=>Ke,CurvePath:()=>el,CustomBlending:()=>Fd,CustomToneMapping:()=>np,CylinderGeometry:()=>Ls,Cylindrical:()=>iu,Data3DTexture:()=>br,DataArrayTexture:()=>ws,DataTexture:()=>sn,DataTextureLoader:()=>Nh,
DataUtils:()=>ag,DecrementStencilOp:()=>lm,DecrementWrapStencilOp:()=>hm,DefaultLoadingManager:()=>Fp,DepthFormat:()=>Ni,DepthStencilFormat:()=>zi,DepthTexture:()=>Ar,DetachedBindMode:()=>ip,DirectionalLight:()=>Il,DirectionalLightHelper:()=>du,DiscreteInterpolant:()=>Tl,DodecahedronGeometry:()=>rl,
DoubleSide:()=>yn,DstAlphaFactor:()=>Xd,DstColorFactor:()=>Yd,DynamicCopyUsage:()=>Tm,DynamicDrawUsage:()=>vm,DynamicReadUsage:()=>Sm,EdgesGeometry:()=>al,EllipseCurve:()=>Ds,EqualCompare:()=>mp,EqualDepth:()=>to,EqualStencilFunc:()=>pm,EquirectangularReflectionMapping:()=>pr,EquirectangularRefractionMapping:()=>mr,
Euler:()=>$e,EventDispatcher:()=>rn,ExtrudeGeometry:()=>ol,FileLoader:()=>gn,Float16BufferAttribute:()=>hh,Float32BufferAttribute:()=>gt,FloatType:()=>Xe,Fog:()=>Bo,FogExp2:()=>Oo,FramebufferTexture:()=>Eh,FrontSide:()=>Gn,Frustum:()=>Hi,GLBufferAttribute:()=>jh,GLSL1:()=>Am,GLSL3:()=>nh,GreaterCompare:()=>gp,
GreaterDepth:()=>no,GreaterEqualCompare:()=>xp,GreaterEqualDepth:()=>eo,GreaterEqualStencilFunc:()=>xm,GreaterStencilFunc:()=>gm,GridHelper:()=>uu,Group:()=>ai,HalfFloatType:()=>ln,HemisphereLight:()=>Al,HemisphereLightHelper:()=>hu,IcosahedronGeometry:()=>ll,ImageBitmapLoader:()=>Vh,ImageLoader:()=>Ki,
ImageUtils:()=>Do,IncrementStencilOp:()=>om,IncrementWrapStencilOp:()=>cm,InstancedBufferAttribute:()=>qn,InstancedBufferGeometry:()=>Fl,InstancedInterleavedBuffer:()=>Qh,InstancedMesh:()=>Wo,Int16BufferAttribute:()=>lh,Int32BufferAttribute:()=>ch,Int8BufferAttribute:()=>rh,IntType:()=>Jl,InterleavedBuffer:()=>Gi,
InterleavedBufferAttribute:()=>hi,Interpolant:()=>qi,InterpolateDiscrete:()=>xr,InterpolateLinear:()=>Po,InterpolateSmooth:()=>Za,InvertStencilOp:()=>um,KeepStencilOp:()=>Ci,KeyframeTrack:()=>Qe,LOD:()=>Vo,LatheGeometry:()=>Br,Layers:()=>As,LessCompare:()=>pp,LessDepth:()=>ja,LessEqualCompare:()=>Nu,
LessEqualDepth:()=>Oi,LessEqualStencilFunc:()=>mm,LessStencilFunc:()=>dm,Light:()=>An,LightProbe:()=>Ul,Line:()=>wn,Line3:()=>au,LineBasicMaterial:()=>Re,LineCurve:()=>Ur,LineCurve3:()=>jo,LineDashedMaterial:()=>bl,LineLoop:()=>Zo,LineSegments:()=>on,LinearFilter:()=>ye,LinearInterpolant:()=>Xr,LinearMipMapLinearFilter:()=>em,
LinearMipMapNearestFilter:()=>tm,LinearMipmapLinearFilter:()=>Sn,LinearMipmapNearestFilter:()=>ir,LinearSRGBColorSpace:()=>Qi,LinearToneMapping:()=>Hl,LinearTransfer:()=>jr,Loader:()=>Ne,LoaderUtils:()=>Jr,LoadingManager:()=>Yr,LoopOnce:()=>sp,LoopPingPong:()=>ap,LoopRepeat:()=>rp,LuminanceAlphaFormat:()=>Pu,
LuminanceFormat:()=>Iu,MOUSE:()=>Zp,Material:()=>we,MaterialLoader:()=>Nl,MathUtils:()=>Wm,Matrix2:()=>su,Matrix3:()=>zt,Matrix4:()=>Ut,MaxEquation:()=>kd,Mesh:()=>he,MeshBasicMaterial:()=>an,MeshDepthMaterial:()=>Cr,MeshDistanceMaterial:()=>Rr,MeshLambertMaterial:()=>Ml,MeshMatcapMaterial:()=>Sl,MeshNormalMaterial:()=>yl,
MeshPhongMaterial:()=>xl,MeshPhysicalMaterial:()=>_l,MeshStandardMaterial:()=>Wr,MeshToonMaterial:()=>vl,MinEquation:()=>zd,MirroredRepeatWrapping:()=>_r,MixOperation:()=>tp,MultiplyBlending:()=>jc,MultiplyOperation:()=>Kr,NearestFilter:()=>Ae,NearestMipMapLinearFilter:()=>jp,NearestMipMapNearestFilter:()=>Qp,
NearestMipmapLinearFilter:()=>xs,NearestMipmapNearestFilter:()=>Eu,NeutralToneMapping:()=>Yl,NeverCompare:()=>dp,NeverDepth:()=>Ka,NeverStencilFunc:()=>fm,NoBlending:()=>mn,NoColorSpace:()=>Fn,NoToneMapping:()=>kn,NormalAnimationBlendMode:()=>ec,NormalBlending:()=>Ui,NotEqualCompare:()=>_p,NotEqualDepth:()=>io,
NotEqualStencilFunc:()=>_m,NumberKeyframeTrack:()=>Yi,Object3D:()=>te,ObjectLoader:()=>kh,ObjectSpaceNormalMap:()=>fp,OctahedronGeometry:()=>Hr,OneFactor:()=>Hd,OneMinusConstantAlphaFactor:()=>jd,OneMinusConstantColorFactor:()=>Kd,OneMinusDstAlphaFactor:()=>qd,OneMinusDstColorFactor:()=>Zd,OneMinusSrcAlphaFactor:()=>$a,
OneMinusSrcColorFactor:()=>Wd,OrthographicCamera:()=>ci,PCFShadowMap:()=>bu,PCFSoftShadowMap:()=>Nd,PMREMGenerator:()=>wr,Path:()=>Wi,PerspectiveCamera:()=>ve,Plane:()=>vn,PlaneGeometry:()=>Is,PlaneHelper:()=>_u,PointLight:()=>Rl,PointLightHelper:()=>cu,Points:()=>Jo,PointsMaterial:()=>Dr,PolarGridHelper:()=>fu,
PolyhedronGeometry:()=>ui,PositionalAudio:()=>Xh,PropertyBinding:()=>re,PropertyMixer:()=>zl,QuadraticBezierCurve:()=>Nr,QuadraticBezierCurve3:()=>Fr,Quaternion:()=>Ue,QuaternionKeyframeTrack:()=>Zi,QuaternionLinearInterpolant:()=>wl,RED_GREEN_RGTC2_Format:()=>Ro,RED_RGTC1_Format:()=>Lu,REVISION:()=>Vl,
RGBADepthPacking:()=>up,RGBAFormat:()=>ze,RGBAIntegerFormat:()=>tc,RGBA_ASTC_10x10_Format:()=>bo,RGBA_ASTC_10x5_Format:()=>yo,RGBA_ASTC_10x6_Format:()=>Mo,RGBA_ASTC_10x8_Format:()=>So,RGBA_ASTC_12x10_Format:()=>Eo,RGBA_ASTC_12x12_Format:()=>To,RGBA_ASTC_4x4_Format:()=>uo,RGBA_ASTC_5x4_Format:()=>fo,
RGBA_ASTC_5x5_Format:()=>po,RGBA_ASTC_6x5_Format:()=>mo,RGBA_ASTC_6x6_Format:()=>go,RGBA_ASTC_8x5_Format:()=>_o,RGBA_ASTC_8x6_Format:()=>xo,RGBA_ASTC_8x8_Format:()=>vo,RGBA_BPTC_Format:()=>lr,RGBA_ETC2_EAC_Format:()=>ho,RGBA_PVRTC_2BPPV1_Format:()=>oo,RGBA_PVRTC_4BPPV1_Format:()=>ao,RGBA_S3TC_DXT1_Format:()=>rr,
RGBA_S3TC_DXT3_Format:()=>ar,RGBA_S3TC_DXT5_Format:()=>or,RGBDepthPacking:()=>im,RGBFormat:()=>Ru,RGBIntegerFormat:()=>nm,RGB_BPTC_SIGNED_Format:()=>wo,RGB_BPTC_UNSIGNED_Format:()=>Ao,RGB_ETC1_Format:()=>lo,RGB_ETC2_Format:()=>co,RGB_PVRTC_2BPPV1_Format:()=>ro,RGB_PVRTC_4BPPV1_Format:()=>so,RGB_S3TC_DXT1_Format:()=>sr,
RGDepthPacking:()=>sm,RGFormat:()=>Du,RGIntegerFormat:()=>jl,RawShaderMaterial:()=>Us,Ray:()=>li,Raycaster:()=>tu,RectAreaLight:()=>Dl,RedFormat:()=>Ql,RedIntegerFormat:()=>Qr,ReinhardToneMapping:()=>Gl,RenderTarget:()=>Lo,RepeatWrapping:()=>gr,ReplaceStencilOp:()=>am,ReverseSubtractEquation:()=>Bd,
RingGeometry:()=>cl,SIGNED_RED_GREEN_RGTC2_Format:()=>Io,SIGNED_RED_RGTC1_Format:()=>Co,SRGBColorSpace:()=>We,SRGBTransfer:()=>jt,Scene:()=>zo,ShaderChunk:()=>Wt,ShaderLib:()=>pn,ShaderMaterial:()=>ge,ShadowMaterial:()=>gl,Shape:()=>Hn,ShapeGeometry:()=>hl,ShapePath:()=>yu,ShapeUtils:()=>En,ShortType:()=>wu,
Skeleton:()=>Go,SkeletonHelper:()=>lu,SkinnedMesh:()=>Ho,Source:()=>Bn,Sphere:()=>Te,SphereGeometry:()=>Gr,Spherical:()=>nu,SphericalHarmonics3:()=>Ll,SplineCurve:()=>Or,SpotLight:()=>Cl,SpotLightHelper:()=>ou,Sprite:()=>ko,SpriteMaterial:()=>Ir,SrcAlphaFactor:()=>Ja,SrcAlphaSaturateFactor:()=>Jd,SrcColorFactor:()=>Gd,
StaticCopyUsage:()=>Em,StaticDrawUsage:()=>yr,StaticReadUsage:()=>Mm,StereoCamera:()=>Gh,StreamCopyUsage:()=>wm,StreamDrawUsage:()=>ym,StreamReadUsage:()=>bm,StringKeyframeTrack:()=>Zn,SubtractEquation:()=>Od,SubtractiveBlending:()=>Qc,TOUCH:()=>Jp,TangentSpaceNormalMap:()=>fi,TetrahedronGeometry:()=>ul,
Texture:()=>xe,TextureLoader:()=>Fh,TextureUtils:()=>Bv,TorusGeometry:()=>fl,TorusKnotGeometry:()=>dl,Triangle:()=>Mn,TriangleFanDrawMode:()=>cp,TriangleStripDrawMode:()=>lp,TrianglesDrawMode:()=>op,TubeGeometry:()=>pl,UVMapping:()=>Zl,Uint16BufferAttribute:()=>Er,Uint32BufferAttribute:()=>Tr,Uint8BufferAttribute:()=>ah,
Uint8ClampedBufferAttribute:()=>oh,Uniform:()=>$h,UniformsGroup:()=>Kh,UniformsLib:()=>ct,UniformsUtils:()=>Jn,UnsignedByteType:()=>Tn,UnsignedInt248Type:()=>Bi,UnsignedInt5999Type:()=>Au,UnsignedIntType:()=>Xn,UnsignedShort4444Type:()=>$l,UnsignedShort5551Type:()=>Kl,UnsignedShortType:()=>Es,VSMShadowMap:()=>xn,
Vector2:()=>X,Vector3:()=>A,Vector4:()=>$t,VectorKeyframeTrack:()=>Ji,VideoTexture:()=>bh,WebGL3DRenderTarget:()=>sh,WebGLArrayRenderTarget:()=>ih,WebGLCoordinateSystem:()=>bn,WebGLCubeRenderTarget:()=>No,WebGLMultipleRenderTargets:()=>Su,WebGLRenderTarget:()=>Me,WebGLRenderer:()=>yh,WebGLUtils:()=>Rp,
WebGPUCoordinateSystem:()=>Mr,WireframeGeometry:()=>ml,WrapAroundEnding:()=>vr,ZeroCurvatureEnding:()=>Pi,ZeroFactor:()=>Vd,ZeroSlopeEnding:()=>Di,ZeroStencilOp:()=>rm,createCanvasElement:()=>Mp});var Vl="170",Zp={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Jp={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},
Ld=0,Kc=1,Ud=2,$p=3,Kp=0,bu=1,Nd=2,xn=3,Gn=0,ke=1,yn=2,mn=0,Ui=1,dr=2,Qc=3,jc=4,Fd=5,ri=100,Od=101,Bd=102,zd=103,kd=104,Vd=200,Hd=201,Gd=202,Wd=203,Ja=204,$a=205,Xd=206,qd=207,Yd=208,Zd=209,Jd=210,$d=211,Kd=212,Qd=213,jd=214,Ka=0,Qa=1,ja=2,Oi=3,to=4,eo=5,no=6,io=7,Kr=0,tp=1,ep=2,kn=0,Hl=1,Gl=2,Wl=3,
Xl=4,np=5,ql=6,Yl=7,th="attached",ip="detached",Zl=300,Wn=301,oi=302,pr=303,mr=304,Fs=306,gr=1e3,nn=1001,_r=1002,Ae=1003,Eu=1004,Qp=1004,xs=1005,jp=1005,ye=1006,ir=1007,tm=1007,Sn=1008,em=1008,Tn=1009,Tu=1010,wu=1011,Es=1012,Jl=1013,Xn=1014,Xe=1015,ln=1016,$l=1017,Kl=1018,Bi=1020,Au=35902,Cu=1021,Ru=1022,
ze=1023,Iu=1024,Pu=1025,Ni=1026,zi=1027,Ql=1028,Qr=1029,Du=1030,jl=1031,nm=1032,tc=1033,sr=33776,rr=33777,ar=33778,or=33779,so=35840,ro=35841,ao=35842,oo=35843,lo=36196,co=37492,ho=37496,uo=37808,fo=37809,po=37810,mo=37811,go=37812,_o=37813,xo=37814,vo=37815,yo=37816,Mo=37817,So=37818,bo=37819,Eo=37820,
To=37821,lr=36492,wo=36494,Ao=36495,Lu=36283,Co=36284,Ro=36285,Io=36286,sp=2200,rp=2201,ap=2202,xr=2300,Po=2301,Za=2302,Pi=2400,Di=2401,vr=2402,ec=2500,Uu=2501,op=0,lp=1,cp=2,hp=3200,up=3201,im=3202,sm=3203,fi=0,fp=1,Fn="",We="srgb",Qi="srgb-linear",jr="linear",jt="srgb",rm=0,Ci=7680,am=7681,om=7682,
lm=7683,cm=34055,hm=34056,um=5386,fm=512,dm=513,pm=514,mm=515,gm=516,_m=517,xm=518,eh=519,dp=512,pp=513,mp=514,Nu=515,gp=516,_p=517,xp=518,vp=519,yr=35044,vm=35048,ym=35040,Mm=35045,Sm=35049,bm=35041,Em=35046,Tm=35050,wm=35042,Am="100",nh="300 es",bn=2e3,Mr=2001,rn=class{addEventListener(t,e){this._listeners===
void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this.
_listeners[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}},Pe=["00","01","02","03","04","05","\
06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","\
42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","\
7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","\
ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","\
f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Qu=1234567,Fi=Math.PI/180,Ts=180/Math.PI;function Je(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pe[s&255]+Pe[s>>8&255]+Pe[s>>16&255]+Pe[s>>24&255]+"-"+Pe[t&255]+Pe[t>>
8&255]+"-"+Pe[t>>16&15|64]+Pe[t>>24&255]+"-"+Pe[e&63|128]+Pe[e>>8&255]+"-"+Pe[e>>16&255]+Pe[e>>24&255]+Pe[n&255]+Pe[n>>8&255]+Pe[n>>16&255]+Pe[n>>24&255]).toLowerCase()}function pe(s,t,e){return Math.max(t,Math.min(e,s))}function Fu(s,t){return(s%t+t)%t}function Cm(s,t,e,n,i){return n+(s-t)*(i-n)/(e-
t)}function Rm(s,t,e){return s!==t?(e-s)/(t-s):0}function cr(s,t,e){return(1-e)*s+e*t}function Im(s,t,e,n){return cr(s,t,1-Math.exp(-e*n))}function Pm(s,t=1){return t-Math.abs(Fu(s,t*2)-t)}function Dm(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Lm(s,t,e){return s<=t?0:s>=e?1:(s=
(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Um(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Nm(s,t){return s+Math.random()*(t-s)}function Fm(s){return s*(.5-Math.random())}function Om(s){s!==void 0&&(Qu=s);let t=Qu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),
((t^t>>>14)>>>0)/4294967296}function Bm(s){return s*Fi}function zm(s){return s*Ts}function km(s){return(s&s-1)===0&&s!==0}function Vm(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Hm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Gm(s,t,e,n,i){let r=Math.cos,a=Math.
sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),m=a((n-t)/2);switch(i){case"XYX":s.set(o*h,l*u,l*f,o*c);break;case"YZY":s.set(l*f,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*f,o*h,o*c);break;case"XZX":s.set(o*h,l*m,l*d,o*c);break;case"YXY":s.set(l*d,o*h,l*m,o*c);break;case"\
ZYZ":s.set(l*m,l*d,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Be(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/
255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Vt(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:
return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Wm={DEG2RAD:Fi,RAD2DEG:Ts,generateUUID:Je,clamp:pe,
euclideanModulo:Fu,mapLinear:Cm,inverseLerp:Rm,lerp:cr,damp:Im,pingpong:Pm,smoothstep:Dm,smootherstep:Lm,randInt:Um,randFloat:Nm,randFloatSpread:Fm,seededRandom:Om,degToRad:Bm,radToDeg:zm,isPowerOfTwo:km,ceilPowerOfTwo:Vm,floorPowerOfTwo:Hm,setQuaternionFromProperEuler:Gm,normalize:Vt,denormalize:Be},
X=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.
y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(
this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.
y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){
let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,
this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(
this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.
y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){
return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){
return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){
return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.
x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},zt=class s{constructor(t,e,n,i,r,a,o,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=
o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),
e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.
elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],_=i[0],g=i[3],p=i[6],y=i[1],v=i[4],x=i[7],P=i[2],T=i[5],C=i[8];return r[0]=a*_+o*y+l*P,r[3]=a*g+o*v+l*T,r[6]=a*p+o*x+l*C,r[1]=c*_+h*y+u*P,r[4]=c*g+h*v+u*T,r[7]=c*p+h*x+u*C,r[2]=f*_+d*y+m*P,r[5]=f*g+d*
v+m*T,r[8]=f*p+d*x+m*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let t=this.
elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,m=e*u+n*f+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=u*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=f*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*
r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=
e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(hc.makeScale(t,e)),this}rotate(t){return this.premultiply(hc.makeRotation(-t)),this}translate(t,e){
return this.premultiply(hc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){
let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+
8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},hc=new zt;function yp(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}var Xm={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function vs(s,t){
return new Xm[s](t)}function Sr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Mp(){let s=Sr("canvas");return s.style.display="block",s}var ju={};function tr(s){s in ju||(ju[s]=!0,console.warn(s))}function qm(s,t,e){return new Promise(function(n,i){function r(){switch(s.
clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Ym(s){let t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Zm(s){let t=s.elements;
t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var qt={enabled:!0,workingColorSpace:Qi,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===jt&&(s.r=Vn(s.r),s.g=Vn(s.g),s.b=Vn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&
(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===jt&&(s.r=Ss(s.r),s.g=Ss(s.g),s.b=Ss(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},
getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Fn?jr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){
return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};
function Vn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ss(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var tf=[.64,.33,.3,.6,.15,.06],ef=[.2126,.7152,.0722],nf=[.3127,.329],sf=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,
.1191948,.9505322),rf=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[Qi]:{primaries:tf,whitePoint:nf,transfer:jr,toXYZ:sf,fromXYZ:rf,luminanceCoefficients:ef,workingColorSpaceConfig:{unpackColorSpace:We},outputColorSpaceConfig:{drawingBufferColorSpace:We}},
[We]:{primaries:tf,whitePoint:nf,transfer:jt,toXYZ:sf,fromXYZ:rf,luminanceCoefficients:ef,outputColorSpaceConfig:{drawingBufferColorSpace:We}}});var ts,Do=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ts===
void 0&&(ts=Sr("canvas")),ts.width=t.width,ts.height=t.height;let n=ts.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ts}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",
t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Sr("canvas");e.width=t.width,e.height=
t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Vn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof
Uint8ClampedArray?e[n]=Math.floor(Vn(e[n]/255)*255):e[n]=Vn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Jm=0,Bn=class{constructor(t=null){this.isSource=!0,Object.defineProperty(
this,"id",{value:Jm++}),this.uuid=Je(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.
isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(uc(i[a].image)):r.push(uc(i[a]))}else r=uc(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function uc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||
typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Do.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var $m=0,xe=class s extends rn{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=nn,i=nn,r=ye,a=Sn,o=ze,l=Tn,c=s.
DEFAULT_ANISOTROPY,h=Fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$m++}),this.uuid=Je(),this.name="",this.source=new Bn(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=
null,this.type=l,this.offset=new X(0,0),this.repeat=new X(1,1),this.center=new X(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,
this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().
copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=
t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.
flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"\
Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],
format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};
return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Zl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case gr:t.x=t.x-Math.floor(t.x);break;case nn:
t.x=t.x<0?0:1;break;case _r:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case gr:t.y=t.y-Math.floor(t.y);break;case nn:t.y=t.y<0?0:1;break;case _r:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);
break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};xe.DEFAULT_IMAGE=null;xe.DEFAULT_MAPPING=Zl;xe.DEFAULT_ANISOTROPY=1;var $t=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,
this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.
y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:
return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=
t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,
this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.
z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,
this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],
h=l[4],u=l[8],f=l[1],d=l[5],m=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(c+1)/2,x=(d+1)/2,P=(p+1)/2,T=(h+f)/4,C=(u+_)/4,R=(m+g)/4;return v>
x&&v>P?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=T/n,r=C/n):x>P?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=T/i,r=R/i):P<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(P),n=C/r,i=R/r),this.set(n,i,r,e),this}let y=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(f-h)*(f-h));return Math.
abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-_)/y,this.z=(f-h)/y,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.
z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.
z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(
n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.
x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.
w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.
z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=
t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,
t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Lo=class extends rn{constructor(t=1,e=1,n={}){
super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new $t(0,0,t,e),this.scissorTest=!1,this.viewport=new $t(0,0,t,e);let i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ye,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,
resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new xe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)
this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.
textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}
this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.
length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Bn(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=
t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Me=class extends Lo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ws=class extends xe{constructor(t=null,e=1,n=1,i=1){
super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.
clear()}},ih=class extends Me{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new ws(null,t,e,n),this.texture.isRenderTargetTexture=!0}},br=class extends xe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,
height:n,depth:i},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},sh=class extends Me{constructor(t=1,e=1,n=1,i={}){super(t,e,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new br(null,t,e,n),this.texture.isRenderTargetTexture=
!0}},Ue=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],f=r[a+0],d=r[a+1],m=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=
m,t[e+3]=_;return}if(u!==_||l!==f||c!==d||h!==m){let g=1-o,p=l*f+c*d+h*m+u*_,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let P=Math.sqrt(v),T=Math.atan2(P,p*y);g=Math.sin(g*T)/P,o=Math.sin(o*T)/P}let x=o*y;if(l=l*g+f*x,c=c*g+d*x,h=h*g+m*x,u=u*g+_*x,g===1-o){let P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,
h*=P,u*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],f=r[a+1],d=r[a+2],m=r[a+3];return t[e]=o*m+h*u+l*d-c*f,t[e+1]=l*m+h*f+c*u-o*d,t[e+2]=c*m+h*d+o*f-l*u,t[e+3]=h*m-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=
t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),
this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),f=l(n/2),d=l(i/2),m=l(r/2);
switch(a){case"XYZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"\
ZYX":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"YZX":this._x=f*h*u+c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u-f*d*m;break;case"XZY":this._x=f*h*u-c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u+f*d*m;break;default:console.warn(
"THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,
n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-i)*d}else if(n>o&&n>u){let d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+c)/d}else if(o>u){let d=2*Math.sqrt(
1+o-n-u);this._w=(r-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-o);this._w=(a-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?
(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(pe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===
0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this.
_x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this.
_w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*
h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this.
_w=a,this._x=n,this._y=i,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this.
_w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*
Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,
t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,
yield this._z,yield this._w}},A=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){
return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index \
is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.
z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=
t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(af.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(af.setFromAxisAngle(
t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*
n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+
o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*
e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){
return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.
x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){
return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.
x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){
return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.
crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return fc.copy(this).
projectOnVector(t),this.sub(fc)}reflect(t){return this.sub(fc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){
let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*
Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.
y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){
return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){
return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(
1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},fc=new A,af=new Ue,Ce=class{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(
e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(un.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(un.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,
n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=un.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){
return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.
min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(
t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,un):un.fromBufferAttribute(r,a),un.applyMatrix4(t.matrixWorld),this.
expandByPoint(un);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ia.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ia.copy(n.boundingBox)),ia.applyMatrix4(t.matrixWorld),this.union(ia)}let i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(
i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){
return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){
return this.clampPoint(t.center,un),un.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=
t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Hs),sa.subVectors(this.max,Hs),es.subVectors(
t.a,Hs),ns.subVectors(t.b,Hs),is.subVectors(t.c,Hs),Qn.subVectors(ns,es),jn.subVectors(is,ns),mi.subVectors(es,is);let e=[0,-Qn.z,Qn.y,0,-jn.z,jn.y,0,-mi.z,mi.y,Qn.z,0,-Qn.x,jn.z,0,-jn.x,mi.z,0,-mi.x,-Qn.y,Qn.x,0,-jn.y,jn.x,0,-mi.y,mi.x,0];return!dc(e,es,ns,is,sa)||(e=[1,0,0,0,1,0,0,0,1],!dc(e,es,ns,
is,sa))?!1:(ra.crossVectors(Qn,jn),e=[ra.x,ra.y,ra.z],dc(e,es,ns,is,sa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,un).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(un).
length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.
min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.
max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},In=[new A,new A,new A,new A,new A,new A,new A,new A],un=new A,
ia=new Ce,es=new A,ns=new A,is=new A,Qn=new A,jn=new A,mi=new A,Hs=new A,sa=new A,ra=new A,gi=new A;function dc(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){gi.fromArray(s,r);let o=i.x*Math.abs(gi.x)+i.y*Math.abs(gi.y)+i.z*Math.abs(gi.z),l=t.dot(gi),c=e.dot(gi),h=n.dot(gi);if(Math.max(-Math.max(l,
c,h),Math.min(l,c,h))>o)return!1}return!0}var Km=new Ce,Gs=new A,pc=new A,Te=class{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Km.setFromPoints(t).getCenter(n);
let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.
distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(
t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,
this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gs.subVectors(t,this.center);
let e=Gs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Gs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(pc.
subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gs.copy(t.center).add(pc)),this.expandByPoint(Gs.copy(t.center).sub(pc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Pn=new A,mc=new A,aa=new A,
ti=new A,gc=new A,oa=new A,_c=new A,li=class{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(
this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,
n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Pn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pn.copy(this.origin).addScaledVector(this.direction,e),Pn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){mc.copy(
t).add(e).multiplyScalar(.5),aa.copy(e).sub(t).normalize(),ti.copy(this.origin).sub(mc);let r=t.distanceTo(e)*.5,a=-this.direction.dot(aa),o=ti.dot(this.direction),l=-ti.dot(aa),c=ti.lengthSq(),h=Math.abs(1-a*a),u,f,d,m;if(h>0)if(u=a*l-o,f=a*o-l,m=r*h,u>=0)if(f>=-m)if(f<=m){let _=1/h;u*=_,f*=_,d=u*(u+
a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-m?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=m?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),
f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(mc).addScaledVector(aa,f),d}intersectSphere(t,e){Pn.subVectors(t.center,this.origin);let n=Pn.dot(this.direction),
i=Pn.dot(Pn)-n*n,r=t.radius*t.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(
this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,
i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(
i))&&(i=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Pn)!==null}intersectTriangle(t,e,n,i,r){gc.subVectors(e,t),oa.subVectors(n,t),_c.crossVectors(
gc,oa);let a=this.direction.dot(_c),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ti.subVectors(this.origin,t);let l=o*this.direction.dot(oa.crossVectors(ti,oa));if(l<0)return null;let c=o*this.direction.dot(gc.cross(ti));if(c<0||l+c>a)return null;let h=-o*ti.dot(_c);return h<
0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ut=class s{constructor(t,e,n,i,r,a,o,l,c,h,u,f,d,m,_,g){
s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,f,d,m,_,g)}set(t,e,n,i,r,a,o,l,c,h,u,f,d,m,_,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=_,
p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=
n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(
this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/ss.setFromMatrixColumn(t,0).length(),r=1/ss.setFromMatrixColumn(t,1).length(),a=1/
ss.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(
n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=a*h,d=a*u,m=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+m*c,e[5]=f-_*c,e[9]=-o*l,e[2]=_-f*c,e[6]=m+d*c,e[10]=a*l}else if(t.order==="YXZ"){let f=l*h,d=l*u,m=c*h,_=c*u;e[0]=f+_*o,e[4]=m*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=
-o,e[2]=d*o-m,e[6]=_+f*o,e[10]=a*l}else if(t.order==="ZXY"){let f=l*h,d=l*u,m=c*h,_=c*u;e[0]=f-_*o,e[4]=-a*u,e[8]=m+d*o,e[1]=d+m*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let f=a*h,d=a*u,m=o*h,_=o*u;e[0]=l*h,e[4]=m*c-d,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=d*c-m,e[2]=-c,
e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let f=a*l,d=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=_-f*u,e[8]=m*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+m,e[10]=f-_*u}else if(t.order==="XZY"){let f=a*l,d=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=a*h,e[9]=d*u-m,e[2]=m*u-d,e[6]=o*h,e[10]=_*
u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Qm,t,jm)}lookAt(t,e,n){let i=this.elements;return Ye.subVectors(t,e),Ye.lengthSq()===0&&(Ye.z=1),Ye.normalize(),ei.crossVectors(n,Ye),ei.lengthSq()===0&&(Math.abs(n.z)===1?Ye.x+=1e-4:
Ye.z+=1e-4,Ye.normalize(),ei.crossVectors(n,Ye)),ei.normalize(),la.crossVectors(Ye,ei),i[0]=ei.x,i[4]=la.x,i[8]=Ye.x,i[1]=ei.y,i[5]=la.y,i[9]=Ye.y,i[2]=ei.z,i[6]=la.z,i[10]=Ye.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){
let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],_=n[6],g=n[10],p=n[14],y=n[3],v=n[7],x=n[11],P=n[15],T=i[0],C=i[4],R=i[8],b=i[12],M=i[1],D=i[5],k=i[9],O=i[13],V=i[2],J=i[6],H=i[10],et=i[14],G=i[3],lt=i[7],mt=i[11],St=i[15];return r[0]=a*
T+o*M+l*V+c*G,r[4]=a*C+o*D+l*J+c*lt,r[8]=a*R+o*k+l*H+c*mt,r[12]=a*b+o*O+l*et+c*St,r[1]=h*T+u*M+f*V+d*G,r[5]=h*C+u*D+f*J+d*lt,r[9]=h*R+u*k+f*H+d*mt,r[13]=h*b+u*O+f*et+d*St,r[2]=m*T+_*M+g*V+p*G,r[6]=m*C+_*D+g*J+p*lt,r[10]=m*R+_*k+g*H+p*mt,r[14]=m*b+_*O+g*et+p*St,r[3]=y*T+v*M+x*V+P*G,r[7]=y*C+v*D+x*J+P*
lt,r[11]=y*R+v*k+x*H+P*mt,r[15]=y*b+v*O+x*et+P*St,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],
a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+r*l*u-i*c*u-r*o*f+n*c*f+i*o*d-n*l*d)+_*(+e*l*d-e*c*f+r*a*f-i*a*d+i*c*h-r*l*h)+g*(+e*c*u-e*o*d-r*a*u+n*a*d+r*o*h-n*c*h)+p*(-i*o*h-e*l*u+e*o*f+i*a*u-n*a*f+n*l*h)}transpose(){let t=this.elements,e;return e=
t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,
e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],m=t[12],_=t[13],g=t[14],p=t[15],y=u*g*c-_*f*c+_*l*d-o*g*d-u*l*p+o*f*p,v=m*f*c-h*g*c-m*l*d+a*g*d+h*l*p-a*f*p,x=h*_*c-m*u*c+m*o*d-a*_*d-h*o*p+a*u*p,P=m*u*l-h*_*l-m*o*f+a*_*f+h*o*g-a*u*g,T=e*y+n*v+i*x+r*P;if(T===0)return this.
set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/T;return t[0]=y*C,t[1]=(_*f*r-u*g*r-_*i*d+n*g*d+u*i*p-n*f*p)*C,t[2]=(o*g*r-_*l*r+_*i*c-n*g*c-o*i*p+n*l*p)*C,t[3]=(u*l*r-o*f*r-u*i*c+n*f*c+o*i*d-n*l*d)*C,t[4]=v*C,t[5]=(h*g*r-m*f*r+m*i*d-e*g*d-h*i*p+e*f*p)*C,t[6]=(m*l*r-a*g*r-m*i*c+e*g*c+a*i*p-e*l*p)*C,t[7]=
(a*f*r-h*l*r+h*i*c-e*f*c-a*i*d+e*l*d)*C,t[8]=x*C,t[9]=(m*u*r-h*_*r-m*n*d+e*_*d+h*n*p-e*u*p)*C,t[10]=(a*_*r-m*o*r+m*n*c-e*_*c-a*n*p+e*o*p)*C,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*d-e*o*d)*C,t[12]=P*C,t[13]=(h*_*i-m*u*i+m*n*f-e*_*f-h*n*g+e*u*g)*C,t[14]=(m*o*i-a*_*i-m*n*l+e*_*l+a*n*g-e*o*g)*C,t[15]=(a*u*i-
h*o*i+h*n*l-e*u*l-a*n*f+e*o*f)*C,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*
t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){
let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+
n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,
h=a+a,u=o+o,f=r*c,d=r*h,m=r*u,_=a*h,g=a*u,p=o*u,y=l*c,v=l*h,x=l*u,P=n.x,T=n.y,C=n.z;return i[0]=(1-(_+p))*P,i[1]=(d+x)*P,i[2]=(m-v)*P,i[3]=0,i[4]=(d-x)*T,i[5]=(1-(f+p))*T,i[6]=(g+y)*T,i[7]=0,i[8]=(m+v)*C,i[9]=(g-y)*C,i[10]=(1-(f+_))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){
let i=this.elements,r=ss.set(i[0],i[1],i[2]).length(),a=ss.set(i[4],i[5],i[6]).length(),o=ss.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],fn.copy(this);let c=1/r,h=1/a,u=1/o;return fn.elements[0]*=c,fn.elements[1]*=c,fn.elements[2]*=c,fn.elements[4]*=h,fn.
elements[5]*=h,fn.elements[6]*=h,fn.elements[8]*=u,fn.elements[9]*=u,fn.elements[10]*=u,e.setFromRotationMatrix(fn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=bn){let l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i),d,m;if(o===bn)d=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===
Mr)d=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=bn){let l=this.elements,
c=1/(e-t),h=1/(n-i),u=1/(a-r),f=(e+t)*c,d=(n+i)*h,m,_;if(o===bn)m=(a+r)*u,_=-2*u;else if(o===Mr)m=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-m,l[3]=
0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],
t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ss=new A,fn=new Ut,Qm=new A(0,0,0),jm=new A(1,1,1),ei=new A,la=new A,Ye=new A,of=new Ut,lf=new Ue,$e=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){
this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){
this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),
this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(pe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"\
YXZ":this._x=Math.asin(-pe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(pe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"\
ZYX":this._y=Math.asin(-pe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(pe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"\
XZY":this._z=Math.asin(-pe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){
return of.makeRotationFromQuaternion(t),this.setFromRotationMatrix(of,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return lf.setFromEuler(this),this.setFromQuaternion(lf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){
return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this.
_x,yield this._y,yield this._z,yield this._order}};$e.DEFAULT_ORDER="XYZ";var As=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.
mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},tg=0,cf=new A,rs=new Ue,Dn=new Ut,ca=new A,Ws=new A,eg=new A,ng=new Ue,hf=new A(1,0,0),uf=new A(0,1,0),ff=new A(0,0,1),df={type:"added"},ig={type:"removed"},as={type:"childadded",child:null},xc={type:"childremoved",child:null},te=class s extends rn{constructor(){
super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tg++}),this.uuid=Je(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new A,e=new $e,n=new Ue,i=new A(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,
!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ut},normalMatrix:{
value:new zt}}),this.matrix=new Ut,this.matrixWorld=new Ut,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new As,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,
this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.
quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return rs.
setFromAxisAngle(t,e),this.quaternion.multiply(rs),this}rotateOnWorldAxis(t,e){return rs.setFromAxisAngle(t,e),this.quaternion.premultiply(rs),this}rotateX(t){return this.rotateOnAxis(hf,t)}rotateY(t){return this.rotateOnAxis(uf,t)}rotateZ(t){return this.rotateOnAxis(ff,t)}translateOnAxis(t,e){return cf.
copy(t).applyQuaternion(this.quaternion),this.position.add(cf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(hf,t)}translateY(t){return this.translateOnAxis(uf,t)}translateZ(t){return this.translateOnAxis(ff,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.
matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ca.copy(t):ca.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(Ws,
ca,this.up):Dn.lookAt(ca,Ws,this.up),this.quaternion.setFromRotationMatrix(Dn),i&&(Dn.extractRotation(i.matrixWorld),rs.setFromRotationMatrix(Dn),this.quaternion.premultiply(rs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?
(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(df),as.child=t,this.dispatchEvent(as),as.child=null):console.error("THREE.Object3D.add: object not an instance of THREE\
.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ig),xc.child=t,this.dispatchEvent(xc),xc.child=null),this}removeFromParent(){
let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Dn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Dn),t.removeFromParent(),
t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(df),as.child=t,this.dispatchEvent(as),as.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;
for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(
!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,t,eg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,ng,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.
matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){
let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.
parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(
!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){
let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===
!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=
this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&
(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.
min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,
i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==
null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=
this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==
void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.
uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.
push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(
t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let l=[];for(let c in o){
let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.
matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,
this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};te.DEFAULT_UP=new A(0,1,0);te.DEFAULT_MATRIX_AUTO_UPDATE=
!0;te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var dn=new A,Ln=new A,vc=new A,Un=new A,os=new A,ls=new A,pf=new A,yc=new A,Mc=new A,Sc=new A,bc=new $t,Ec=new $t,Tc=new $t,Mn=class s{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),dn.subVectors(t,
e),i.cross(dn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){dn.subVectors(i,e),Ln.subVectors(n,e),vc.subVectors(t,e);let a=dn.dot(dn),o=dn.dot(Ln),l=dn.dot(vc),c=Ln.dot(Ln),h=Ln.dot(vc),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let f=1/
u,d=(c*l-o*h)*f,m=(a*h-o*l)*f;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):
(l.setScalar(0),l.addScaledVector(r,Un.x),l.addScaledVector(a,Un.y),l.addScaledVector(o,Un.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return bc.setScalar(0),Ec.setScalar(0),Tc.setScalar(0),bc.fromBufferAttribute(t,e),Ec.fromBufferAttribute(t,n),Tc.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(
bc,r.x),a.addScaledVector(Ec,r.y),a.addScaledVector(Tc,r.z),a}static isFrontFacing(t,e,n,i){return dn.subVectors(n,e),Ln.subVectors(t,e),dn.cross(Ln).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),
this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.
subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),dn.cross(Ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){
return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(
this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,a,o;os.subVectors(i,n),ls.subVectors(r,n),yc.subVectors(t,n);let l=os.dot(yc),c=ls.dot(yc);if(l<=0&&c<=0)return e.copy(n);Mc.subVectors(t,i);let h=os.dot(Mc),u=ls.dot(Mc);if(h>=0&&u<=h)return e.copy(i);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=
l/(l-h),e.copy(n).addScaledVector(os,a);Sc.subVectors(t,r);let d=os.dot(Sc),m=ls.dot(Sc);if(m>=0&&d<=m)return e.copy(r);let _=d*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(ls,o);let g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return pf.subVectors(r,i),o=(u-h)/(u-h+(d-m)),e.copy(i).addScaledVector(
pf,o);let p=1/(g+_+f);return a=_*p,o=f*p,e.copy(n).addScaledVector(os,a).addScaledVector(ls,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Sp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,
blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,
darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,
deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,
indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,
lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,
mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,
orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,
salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,
wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},ha={h:0,s:0,l:0};function wc(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var ot=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.
b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=We){return t=Math.floor(t),this.r=(t>>
16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=qt.workingColorSpace){if(t=Fu(t,1),e=pe(e,0,1),n=pe(n,0,1),e===0)this.r=this.g=this.b=n;else{
let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=wc(a,r,t+1/3),this.g=wc(a,r,t),this.b=wc(a,r,t-1/3)}return qt.toWorkingColorSpace(this,i),this}setStyle(t,e=We){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.
exec(t)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.
exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(
r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===
6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=We){let n=Sp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.
constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Vn(t.r),this.g=Vn(t.g),this.b=Vn(t.b),this}copyLinearToSRGB(t){return this.r=Ss(t.r),this.g=Ss(t.g),this.b=Ss(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){
return this.copyLinearToSRGB(this),this}getHex(t=We){return qt.fromWorkingColorSpace(De.copy(this),t),Math.round(pe(De.r*255,0,255))*65536+Math.round(pe(De.g*255,0,255))*256+Math.round(pe(De.b*255,0,255))}getHexString(t=We){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){
qt.fromWorkingColorSpace(De.copy(this),e);let n=De.r,i=De.g,r=De.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=qt.
workingColorSpace){return qt.fromWorkingColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=We){qt.fromWorkingColorSpace(De.copy(this),t);let e=De.r,n=De.g,i=De.b;return t!==We?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)}\
,${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ni),this.setHSL(ni.h+t,ni.s+e,ni.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=
Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){
return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ni),t.getHSL(ha);let n=cr(ni.h,ha.h,e),i=cr(ni.s,ha.s,e),r=cr(ni.l,ha.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.
r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=
this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},De=new ot;ot.NAMES=Sp;var sg=0,we=class extends rn{static get type(){return"Material"}get type(){
return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=Je(),this.name="",this.blending=Ui,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ja,this.blendDst=$a,this.
blendEquation=ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=eh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=
Ci,this.stencilZFail=Ci,this.stencilZPass=Ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=
!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){
return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}
i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.
color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==
void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),
this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==
void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&
this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&
(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.
isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.
toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.
toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.
isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=
this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(
t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=
this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),
this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&
this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==
1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),
this.blending!==Ui&&(n.blending=this.blending),this.side!==Gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ja&&(n.blendSrc=this.blendSrc),this.blendDst!==$a&&(n.blendDst=this.blendDst),
this.blendEquation!==ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.
isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),
this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==eh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ci&&(n.stencilFail=this.stencilFail),
this.stencilZFail!==Ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==
0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),
this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.
forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===
!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=i(t.textures),
a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,
this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=
t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,
n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,
this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.
visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},an=class extends we{static get type(){return"\
MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $e,this.combine=Kr,this.
reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,
this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.
wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},On=rg();function rg(){let s=new ArrayBuffer(4),t=new Float32Array(s),e=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){
let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=
13)}let r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(c&8388608);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;
for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:a,offsetTable:o}}function Ge(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out \
of range."),s=pe(s,-65504,65504),On.floatView[0]=s;let t=On.uint32View[0],e=t>>23&511;return On.baseTable[e]+((t&8388607)>>On.shiftTable[e])}function er(s){let t=s>>10;return On.uint32View[0]=On.mantissaTable[On.offsetTable[t]+(s&1023)]+On.exponentTable[t],On.floatView[0]}var ag={toHalfFloat:Ge,fromHalfFloat:er},
_e=new A,ua=new X,Qt=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=yr,this.updateRanges=[],
this.gpuType=Xe,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(
t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){
if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ua.fromBufferAttribute(this,e),ua.applyMatrix3(t),this.setXY(e,ua.x,ua.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,
n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.
count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Be(n,this.array)),n}setComponent(t,e,n){return this.normalized&&
(n=Vt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Be(e,this.array)),e}setX(t,e){return this.normalized&&(e=Vt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&
(e=Be(e,this.array)),e}setY(t,e){return this.normalized&&(e=Vt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Be(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Vt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){
let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Be(e,this.array)),e}setW(t,e){return this.normalized&&(e=Vt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Vt(e,this.array),n=Vt(n,this.array)),this.array[t+0]=e,this.array[t+
1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Vt(e,this.array),n=Vt(n,this.array),i=Vt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Vt(e,this.array),n=Vt(n,this.array),i=Vt(i,this.array),
r=Vt(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.
from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==yr&&(t.usage=this.usage),t}},rh=class extends Qt{constructor(t,e,n){super(new Int8Array(t),e,n)}},ah=class extends Qt{constructor(t,e,n){super(new Uint8Array(t),e,n)}},oh=class extends Qt{constructor(t,e,n){
super(new Uint8ClampedArray(t),e,n)}},lh=class extends Qt{constructor(t,e,n){super(new Int16Array(t),e,n)}},Er=class extends Qt{constructor(t,e,n){super(new Uint16Array(t),e,n)}},ch=class extends Qt{constructor(t,e,n){super(new Int32Array(t),e,n)}},Tr=class extends Qt{constructor(t,e,n){super(new Uint32Array(
t),e,n)}},hh=class extends Qt{constructor(t,e,n){super(new Uint16Array(t),e,n),this.isFloat16BufferAttribute=!0}getX(t){let e=er(this.array[t*this.itemSize]);return this.normalized&&(e=Be(e,this.array)),e}setX(t,e){return this.normalized&&(e=Vt(e,this.array)),this.array[t*this.itemSize]=Ge(e),this}getY(t){
let e=er(this.array[t*this.itemSize+1]);return this.normalized&&(e=Be(e,this.array)),e}setY(t,e){return this.normalized&&(e=Vt(e,this.array)),this.array[t*this.itemSize+1]=Ge(e),this}getZ(t){let e=er(this.array[t*this.itemSize+2]);return this.normalized&&(e=Be(e,this.array)),e}setZ(t,e){return this.
normalized&&(e=Vt(e,this.array)),this.array[t*this.itemSize+2]=Ge(e),this}getW(t){let e=er(this.array[t*this.itemSize+3]);return this.normalized&&(e=Be(e,this.array)),e}setW(t,e){return this.normalized&&(e=Vt(e,this.array)),this.array[t*this.itemSize+3]=Ge(e),this}setXY(t,e,n){return t*=this.itemSize,
this.normalized&&(e=Vt(e,this.array),n=Vt(n,this.array)),this.array[t+0]=Ge(e),this.array[t+1]=Ge(n),this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Vt(e,this.array),n=Vt(n,this.array),i=Vt(i,this.array)),this.array[t+0]=Ge(e),this.array[t+1]=Ge(n),this.array[t+2]=Ge(i),this}setXYZW(t,e,n,i,r){
return t*=this.itemSize,this.normalized&&(e=Vt(e,this.array),n=Vt(n,this.array),i=Vt(i,this.array),r=Vt(r,this.array)),this.array[t+0]=Ge(e),this.array[t+1]=Ge(n),this.array[t+2]=Ge(i),this.array[t+3]=Ge(r),this}},gt=class extends Qt{constructor(t,e,n){super(new Float32Array(t),e,n)}},og=0,en=new Ut,
Ac=new te,cs=new A,Ze=new Ce,Xs=new Ce,Ee=new A,Ft=class s extends rn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:og++}),this.uuid=Je(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.
morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yp(t)?Tr:Er)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){
return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){
this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.
attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.
makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,n){return en.makeTranslation(t,e,n),this.applyMatrix4(en),this}scale(t,e,n){return en.makeScale(t,e,n),this.applyMatrix4(
en),this}lookAt(t){return Ac.lookAt(t),Ac.updateMatrix(),this.applyMatrix4(Ac.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.
length;i<r;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new gt(n,3))}else{for(let n=0,i=e.count;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),
e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ce);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",
this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Ze.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(
Ee),Ee.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.
error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Te);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){
console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){let n=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Xs.setFromBufferAttribute(
o),this.morphTargetsRelative?(Ee.addVectors(Ze.min,Xs.min),Ze.expandByPoint(Ee),Ee.addVectors(Ze.max,Xs.max),Ze.expandByPoint(Ee)):(Ze.expandByPoint(Xs.min),Ze.expandByPoint(Xs.max))}Ze.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Ee.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ee));
if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ee.fromBufferAttribute(o,c),l&&(cs.fromBufferAttribute(t,c),Ee.add(cs)),i=Math.max(i,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error(
'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .compute\
Tangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=
new A,l[R]=new A;let c=new A,h=new A,u=new A,f=new X,d=new X,m=new X,_=new A,g=new A;function p(R,b,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,R),d.fromBufferAttribute(r,b),m.fromBufferAttribute(r,M),h.sub(c),u.sub(c),d.sub(f),m.sub(f);
let D=1/(d.x*m.y-m.x*d.y);isFinite(D)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(D),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(D),o[R].add(_),o[b].add(_),o[M].add(_),l[R].add(g),l[b].add(g),l[M].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,
count:t.count}]);for(let R=0,b=y.length;R<b;++R){let M=y[R],D=M.start,k=M.count;for(let O=D,V=D+k;O<V;O+=3)p(t.getX(O+0),t.getX(O+1),t.getX(O+2))}let v=new A,x=new A,P=new A,T=new A;function C(R){P.fromBufferAttribute(i,R),T.copy(P);let b=o[R];v.copy(b),v.sub(P.multiplyScalar(P.dot(b))).normalize(),
x.crossVectors(T,b);let D=x.dot(l[R])<0?-1:1;a.setXYZW(R,v.x,v.y,v.z,D)}for(let R=0,b=y.length;R<b;++R){let M=y[R],D=M.start,k=M.count;for(let O=D,V=D+k;O<V;O+=3)C(t.getX(O+0)),C(t.getX(O+1)),C(t.getX(O+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.
getAttribute("normal");if(n===void 0)n=new Qt(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new A,r=new A,a=new A,o=new A,l=new A,c=new A,h=new A,u=new A;if(t)for(let f=0,d=t.count;f<d;f+=3){let m=t.getX(f+0),_=t.getX(f+1),g=t.
getX(f+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,g),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(
g,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=
!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h),d=0,m=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?
d=l[_]*o.data.stride+o.offset:d=l[_]*h;for(let p=0;p<h;p++)f[m++]=c[d++]}return new Qt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,
n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,
c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;
for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.
morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(
a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};
this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=
t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.
drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},mf=new Ut,_i=new li,fa=new Te,gf=new A,da=new A,pa=new A,ma=new A,Cc=new A,ga=new A,_f=new A,_a=new A,he=class extends te{constructor(t=new Ft,e=new an){super(),this.isMesh=!0,this.type="\
Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.
material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){
let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(r&&o){ga.set(0,0,0);
for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Cc.fromBufferAttribute(u,t),a?ga.addScaledVector(Cc,h):ga.addScaledVector(Cc.sub(e),h))}e.add(ga)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fa.
copy(n.boundingSphere),fa.applyMatrix4(r),_i.copy(t.ray).recast(t.near),!(fa.containsPoint(_i.origin)===!1&&(_i.intersectSphere(fa,gf)===null||_i.origin.distanceToSquared(gf)>(t.far-t.near)**2))&&(mf.copy(r).invert(),_i.copy(t.ray).applyMatrix4(mf),!(n.boundingBox!==null&&_i.intersectsBox(n.boundingBox)===
!1)&&this._computeIntersections(t,e,_i)))}_computeIntersections(t,e,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=f.length;m<_;m++){let g=f[m],
p=a[g.materialIndex],y=Math.max(g.start,d.start),v=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let x=y,P=v;x<P;x+=3){let T=o.getX(x),C=o.getX(x+1),R=o.getX(x+2);i=xa(this,p,t,n,c,h,u,T,C,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let m=Math.
max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let g=m,p=_;g<p;g+=3){let y=o.getX(g),v=o.getX(g+1),x=o.getX(g+2);i=xa(this,a,t,n,c,h,u,y,v,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=f.length;m<_;m++){let g=f[m],p=a[g.materialIndex],y=Math.
max(g.start,d.start),v=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let x=y,P=v;x<P;x+=3){let T=x,C=x+1,R=x+2;i=xa(this,p,t,n,c,h,u,T,C,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let m=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);
for(let g=m,p=_;g<p;g+=3){let y=g,v=g+1,x=g+2;i=xa(this,a,t,n,c,h,u,y,v,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}};function lg(s,t,e,n,i,r,a,o){let l;if(t.side===ke?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Gn,o),l===null)return null;_a.copy(o),_a.applyMatrix4(s.matrixWorld);
let c=e.ray.origin.distanceTo(_a);return c<e.near||c>e.far?null:{distance:c,point:_a.clone(),object:s}}function xa(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,da),s.getVertexPosition(l,pa),s.getVertexPosition(c,ma);let h=lg(s,t,e,n,da,pa,ma,_f);if(h){let u=new A;Mn.getBarycoord(_f,da,pa,ma,u),i&&(h.uv=
Mn.getInterpolatedAttribute(i,o,l,c,u,new X)),r&&(h.uv1=Mn.getInterpolatedAttribute(r,o,l,c,u,new X)),a&&(h.normal=Mn.getInterpolatedAttribute(a,o,l,c,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new A,materialIndex:0};Mn.getNormal(da,pa,ma,f.normal),h.face=
f,h.barycoord=u}return h}var ki=class s extends Ft{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],f=0,d=0;
m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,i,a,2),m("x","z","y",1,-1,t,n,-e,i,a,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(h,3)),this.
setAttribute("uv",new gt(u,2));function m(_,g,p,y,v,x,P,T,C,R,b){let M=x/C,D=P/R,k=x/2,O=P/2,V=T/2,J=C+1,H=R+1,et=0,G=0,lt=new A;for(let mt=0;mt<H;mt++){let St=mt*D-O;for(let kt=0;kt<J;kt++){let ee=kt*M-k;lt[_]=ee*y,lt[g]=St*v,lt[p]=V,c.push(lt.x,lt.y,lt.z),lt[_]=0,lt[g]=0,lt[p]=T>0?1:-1,h.push(lt.x,
lt.y,lt.z),u.push(kt/C),u.push(1-mt/R),et+=1}}for(let mt=0;mt<R;mt++)for(let St=0;St<C;St++){let kt=f+St+J*mt,ee=f+St+J*(mt+1),Z=f+(St+1)+J*(mt+1),it=f+(St+1)+J*mt;l.push(kt,ee,it),l.push(ee,Z,it),G+=6}o.addGroup(d,G,b),d+=G,f+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),
this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Cs(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?
i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Oe(s){let t={};for(let e=0;e<s.length;e++){let n=Cs(s[e]);for(let i in n)
t[i]=n[i]}return t}function cg(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function bp(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}var Jn={clone:Cs,merge:Oe},hg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ug=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ge=class extends we{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hg,this.fragmentShader=ug,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,
this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.
fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Cs(t.uniforms),this.uniformsGroups=cg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.
clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?
e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]=
{type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=
!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Rs=class extends te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ut,this.projectionMatrix=new Ut,this.projectionMatrixInverse=new Ut,this.coordinateSystem=bn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.
copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.
copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ii=new A,xf=new X,vf=new X,ve=class extends Rs{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=
!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,
this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ts*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Fi*.5*this.fov);return .5*
this.getFilmHeight()/t}getEffectiveFOV(){return Ts*2*Math.atan(Math.tan(Fi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),
e.set(ii.x,ii.y).multiplyScalar(-t/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ii.x,ii.y).multiplyScalar(-t/ii.z)}getViewSize(t,e){return this.getViewBounds(t,xf,vf),e.subVectors(vf,xf)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,
fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){
let t=this.near,e=t*Math.tan(Fi*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.
makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=
this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},hs=-90,us=1,Uo=class extends te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=
0;let i=new ve(hs,us,t,e);i.layers=this.layers,this.add(i);let r=new ve(hs,us,t,e);r.layers=this.layers,this.add(r);let a=new ve(hs,us,t,e);a.layers=this.layers,this.add(a);let o=new ve(hs,us,t,e);o.layers=this.layers,this.add(o);let l=new ve(hs,us,t,e);l.layers=this.layers,this.add(l);let c=new ve(
hs,us,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===bn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(
0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Mr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error(
"THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,
this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(
e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Vi=class extends xe{constructor(t,e,n,i,r,a,o,l,c,h){
t=t!==void 0?t:[],e=e!==void 0?e:Wn,super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},No=class extends Me{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.
texture=new Vi(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ye}fromEquirectangularTexture(t,e){
this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ki(5,5,5),r=new ge({name:"CubemapFromEquirect",uniforms:Cs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ke,blending:mn});r.uniforms.tEquirect.value=e;let a=new he(i,r),o=e.minFilter;return e.minFilter===Sn&&(e.minFilter=ye),new Uo(1,10,this).update(t,a),e.
minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}},Rc=new A,fg=new A,dg=new zt,vn=class{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){
return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Rc.subVectors(n,e).cross(fg.subVectors(t,e)).
normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){
return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Rc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===
0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){
return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||dg.getNormalMatrix(t),i=this.coplanarPoint(Rc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=
t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},xi=new Te,va=new A,Hi=class{constructor(t=new vn,e=new vn,n=new vn,i=new vn,r=new vn,a=new vn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){let o=this.planes;
return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=bn){let n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],f=i[7],d=i[8],m=i[9],
_=i[10],g=i[11],p=i[12],y=i[13],v=i[14],x=i[15];if(n[0].setComponents(l-r,f-c,g-d,x-p).normalize(),n[1].setComponents(l+r,f+c,g+d,x+p).normalize(),n[2].setComponents(l+a,f+h,g+m,x+y).normalize(),n[3].setComponents(l-a,f-h,g-m,x-y).normalize(),n[4].setComponents(l-o,f-u,g-_,x-v).normalize(),e===bn)n[5].
setComponents(l+o,f+u,g+_,x+v).normalize();else if(e===Mr)n[5].setComponents(o,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),
xi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(t){return xi.center.set(0,0,0),xi.radius=.7071067811865476,xi.applyMatrix4(
t.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(va.x=i.normal.x>0?t.max.x:t.min.x,va.y=i.normal.y>0?t.max.y:t.
min.y,va.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(va)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Ep(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),
n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function pg(s){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,u=c.byteLength,
f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof
Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,
version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){let m=u[f],_=u[d];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,
u[f]=_)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){let _=u[d];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);
let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===
void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,
remove:r,update:a}}var Is=class s extends Ft{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,f=e/l,d=[],m=[],_=[],g=[];for(let p=0;p<h;p++){let y=p*f-a;
for(let v=0;v<c;v++){let x=v*u-r;m.push(x,-y,0),_.push(0,0,1),g.push(v/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){let v=y+c*p,x=y+c*(p+1),P=y+1+c*(p+1),T=y+1+c*p;d.push(v,x,T),d.push(x,P,T)}this.setIndex(d),this.setAttribute("position",new gt(m,3)),this.setAttribute("normal",new gt(_,
3)),this.setAttribute("uv",new gt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},mg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,_g=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Sg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Eg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ag=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Cg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Rg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ig=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Pg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Dg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ug=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ng=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Fg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Og=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Bg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,zg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,kg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Vg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xg="gl_FragColor = linearToOutputTexel( gl_FragColor );",qg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Zg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Jg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$g=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Qg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,t_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,e_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,n_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,i_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,s_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,r_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,a_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,o_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,l_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,c_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,h_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,u_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,f_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,d_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout Reflecte\
dLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,p_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightSh\
adow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,m_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,g_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,__=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,x_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,v_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,y_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,M_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,S_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,b_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,E_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,T_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,w_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,A_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,C_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,R_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,P_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,D_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,L_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,U_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,F_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,O_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,B_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,z_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,k_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,V_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,H_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,G_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,W_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,X_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,q_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Y_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Z_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,J_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,K_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Q_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,j_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,t0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,e0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,n0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,i0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,s0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,r0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,a0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,o0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,l0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,c0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,h0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,u0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,f0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,d0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,p0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,m0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,v0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,M0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,S0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,b0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,E0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,T0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,A0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,C0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,R0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,L0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,N0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,F0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,O0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,z0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,G0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,W0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,X0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,q0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Y0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:mg,alphahash_pars_fragment:gg,alphamap_fragment:_g,alphamap_pars_fragment:xg,alphatest_fragment:vg,alphatest_pars_fragment:yg,aomap_fragment:Mg,aomap_pars_fragment:Sg,batching_pars_vertex:bg,batching_vertex:Eg,begin_vertex:Tg,beginnormal_vertex:wg,bsdfs:Ag,iridescence_fragment:Cg,
bumpmap_pars_fragment:Rg,clipping_planes_fragment:Ig,clipping_planes_pars_fragment:Pg,clipping_planes_pars_vertex:Dg,clipping_planes_vertex:Lg,color_fragment:Ug,color_pars_fragment:Ng,color_pars_vertex:Fg,color_vertex:Og,common:Bg,cube_uv_reflection_fragment:zg,defaultnormal_vertex:kg,displacementmap_pars_vertex:Vg,
displacementmap_vertex:Hg,emissivemap_fragment:Gg,emissivemap_pars_fragment:Wg,colorspace_fragment:Xg,colorspace_pars_fragment:qg,envmap_fragment:Yg,envmap_common_pars_fragment:Zg,envmap_pars_fragment:Jg,envmap_pars_vertex:$g,envmap_physical_pars_fragment:o_,envmap_vertex:Kg,fog_vertex:Qg,fog_pars_vertex:jg,
fog_fragment:t_,fog_pars_fragment:e_,gradientmap_pars_fragment:n_,lightmap_pars_fragment:i_,lights_lambert_fragment:s_,lights_lambert_pars_fragment:r_,lights_pars_begin:a_,lights_toon_fragment:l_,lights_toon_pars_fragment:c_,lights_phong_fragment:h_,lights_phong_pars_fragment:u_,lights_physical_fragment:f_,
lights_physical_pars_fragment:d_,lights_fragment_begin:p_,lights_fragment_maps:m_,lights_fragment_end:g_,logdepthbuf_fragment:__,logdepthbuf_pars_fragment:x_,logdepthbuf_pars_vertex:v_,logdepthbuf_vertex:y_,map_fragment:M_,map_pars_fragment:S_,map_particle_fragment:b_,map_particle_pars_fragment:E_,metalnessmap_fragment:T_,
metalnessmap_pars_fragment:w_,morphinstance_vertex:A_,morphcolor_vertex:C_,morphnormal_vertex:R_,morphtarget_pars_vertex:I_,morphtarget_vertex:P_,normal_fragment_begin:D_,normal_fragment_maps:L_,normal_pars_fragment:U_,normal_pars_vertex:N_,normal_vertex:F_,normalmap_pars_fragment:O_,clearcoat_normal_fragment_begin:B_,
clearcoat_normal_fragment_maps:z_,clearcoat_pars_fragment:k_,iridescence_pars_fragment:V_,opaque_fragment:H_,packing:G_,premultiplied_alpha_fragment:W_,project_vertex:X_,dithering_fragment:q_,dithering_pars_fragment:Y_,roughnessmap_fragment:Z_,roughnessmap_pars_fragment:J_,shadowmap_pars_fragment:$_,
shadowmap_pars_vertex:K_,shadowmap_vertex:Q_,shadowmask_pars_fragment:j_,skinbase_vertex:t0,skinning_pars_vertex:e0,skinning_vertex:n0,skinnormal_vertex:i0,specularmap_fragment:s0,specularmap_pars_fragment:r0,tonemapping_fragment:a0,tonemapping_pars_fragment:o0,transmission_fragment:l0,transmission_pars_fragment:c0,
uv_pars_fragment:h0,uv_pars_vertex:u0,uv_vertex:f0,worldpos_vertex:d0,background_vert:p0,background_frag:m0,backgroundCube_vert:g0,backgroundCube_frag:_0,cube_vert:x0,cube_frag:v0,depth_vert:y0,depth_frag:M0,distanceRGBA_vert:S0,distanceRGBA_frag:b0,equirect_vert:E0,equirect_frag:T0,linedashed_vert:w0,
linedashed_frag:A0,meshbasic_vert:C0,meshbasic_frag:R0,meshlambert_vert:I0,meshlambert_frag:P0,meshmatcap_vert:D0,meshmatcap_frag:L0,meshnormal_vert:U0,meshnormal_frag:N0,meshphong_vert:F0,meshphong_frag:O0,meshphysical_vert:B0,meshphysical_frag:z0,meshtoon_vert:k0,meshtoon_frag:V0,points_vert:H0,points_frag:G0,
shadow_vert:W0,shadow_frag:X0,sprite_vert:q0,sprite_frag:Y0},ct={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{
value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},
lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new X(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},
displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{
gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,
shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,
shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},
shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},
ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new X(
.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},pn={basic:{uniforms:Oe([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},
lambert:{uniforms:Oe([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new ot(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:Oe([ct.common,ct.specularmap,ct.
envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:Oe([ct.common,ct.envmap,ct.aomap,
ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:Oe(
[ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new ot(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:Oe([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{
value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:Oe([ct.points,ct.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:Oe([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,
fragmentShader:Wt.linedashed_frag},depth:{uniforms:Oe([ct.common,ct.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:Oe([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},
sprite:{uniforms:Oe([ct.sprite,ct.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},
flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.
cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:Oe([ct.common,ct.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.
distanceRGBA_frag},shadow:{uniforms:Oe([ct.lights,ct.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};pn.physical={uniforms:Oe([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{
value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new X(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{
value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{
value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new X},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{
value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{
value:new zt},anisotropyVector:{value:new X},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};var ya={r:0,b:0,g:0},vi=new $e,Z0=new Ut;function J0(s,t,e,n,i,r,a){let o=new ot(0),l=r===!0?0:1,c,h,u=null,f=0,d=null;
function m(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function _(y){let v=!1,x=m(y);x===null?p(o,l):x&&x.isColor&&(p(x,1),v=!0);let P=s.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&
n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(y,v){let x=m(v);x&&(x.isCubeTexture||x.mapping===Fs)?(h===void 0&&(h=new he(new ki(1,1,
1),new ge({name:"BackgroundCubeMaterial",uniforms:Cs(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=
function(P,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),vi.copy(v.backgroundRotation),vi.x*=-1,vi.y*=-1,vi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),h.material.
uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(
Z0.makeRotationFromEuler(vi)),h.material.toneMapped=qt.getTransfer(x.colorSpace)!==jt,(u!==x||f!==x.version||d!==s.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,d=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new he(new Is(
2,2),new ge({name:"BackgroundMaterial",uniforms:Cs(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.
uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=qt.getTransfer(x.colorSpace)!==jt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.
version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,d=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,v){y.getRGB(ya,bp(s)),n.buffers.color.setClear(ya.r,ya.g,ya.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(y,v=1){
o.set(y),l=v,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(o,l)},render:_,addToRenderList:g}}function $0(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null),r=i,a=!1;function o(M,D,k,O,V){let J=!1,H=u(O,k,D);r!==H&&(r=H,c(r.object)),J=d(M,O,k,V),J&&m(M,O,k,V),
V!==null&&t.update(V,s.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,x(M,D,k,O),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,D,k){let O=k.wireframe===
!0,V=n[M.id];V===void 0&&(V={},n[M.id]=V);let J=V[D.id];J===void 0&&(J={},V[D.id]=J);let H=J[O];return H===void 0&&(H=f(l()),J[O]=H),H}function f(M){let D=[],k=[],O=[];for(let V=0;V<e;V++)D[V]=0,k[V]=0,O[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:k,attributeDivisors:O,
object:M,attributes:{},index:null}}function d(M,D,k,O){let V=r.attributes,J=D.attributes,H=0,et=k.getAttributes();for(let G in et)if(et[G].location>=0){let mt=V[G],St=J[G];if(St===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(St=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(St=M.instanceColor)),
mt===void 0||mt.attribute!==St||St&&mt.data!==St.data)return!0;H++}return r.attributesNum!==H||r.index!==O}function m(M,D,k,O){let V={},J=D.attributes,H=0,et=k.getAttributes();for(let G in et)if(et[G].location>=0){let mt=J[G];mt===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(mt=M.instanceMatrix),
G==="instanceColor"&&M.instanceColor&&(mt=M.instanceColor));let St={};St.attribute=mt,mt&&mt.data&&(St.data=mt.data),V[G]=St,H++}r.attributes=V,r.attributesNum=H,r.index=O}function _(){let M=r.newAttributes;for(let D=0,k=M.length;D<k;D++)M[D]=0}function g(M){p(M,0)}function p(M,D){let k=r.newAttributes,
O=r.enabledAttributes,V=r.attributeDivisors;k[M]=1,O[M]===0&&(s.enableVertexAttribArray(M),O[M]=1),V[M]!==D&&(s.vertexAttribDivisor(M,D),V[M]=D)}function y(){let M=r.newAttributes,D=r.enabledAttributes;for(let k=0,O=D.length;k<O;k++)D[k]!==M[k]&&(s.disableVertexAttribArray(k),D[k]=0)}function v(M,D,k,O,V,J,H){
H===!0?s.vertexAttribIPointer(M,D,k,V,J):s.vertexAttribPointer(M,D,k,O,V,J)}function x(M,D,k,O){_();let V=O.attributes,J=k.getAttributes(),H=D.defaultAttributeValues;for(let et in J){let G=J[et];if(G.location>=0){let lt=V[et];if(lt===void 0&&(et==="instanceMatrix"&&M.instanceMatrix&&(lt=M.instanceMatrix),
et==="instanceColor"&&M.instanceColor&&(lt=M.instanceColor)),lt!==void 0){let mt=lt.normalized,St=lt.itemSize,kt=t.get(lt);if(kt===void 0)continue;let ee=kt.buffer,Z=kt.type,it=kt.bytesPerElement,bt=Z===s.INT||Z===s.UNSIGNED_INT||lt.gpuType===Jl;if(lt.isInterleavedBufferAttribute){let rt=lt.data,It=rt.
stride,Ot=lt.offset;if(rt.isInstancedInterleavedBuffer){for(let Lt=0;Lt<G.locationSize;Lt++)p(G.location+Lt,rt.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Lt=0;Lt<G.locationSize;Lt++)g(G.location+Lt);s.bindBuffer(
s.ARRAY_BUFFER,ee);for(let Lt=0;Lt<G.locationSize;Lt++)v(G.location+Lt,St/G.locationSize,Z,mt,It*it,(Ot+St/G.locationSize*Lt)*it,bt)}else{if(lt.isInstancedBufferAttribute){for(let rt=0;rt<G.locationSize;rt++)p(G.location+rt,lt.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O.
_maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let rt=0;rt<G.locationSize;rt++)g(G.location+rt);s.bindBuffer(s.ARRAY_BUFFER,ee);for(let rt=0;rt<G.locationSize;rt++)v(G.location+rt,St/G.locationSize,Z,mt,St*it,St/G.locationSize*rt*it,bt)}}else if(H!==void 0){let mt=H[et];if(mt!==void 0)switch(mt.
length){case 2:s.vertexAttrib2fv(G.location,mt);break;case 3:s.vertexAttrib3fv(G.location,mt);break;case 4:s.vertexAttrib4fv(G.location,mt);break;default:s.vertexAttrib1fv(G.location,mt)}}}}y()}function P(){R();for(let M in n){let D=n[M];for(let k in D){let O=D[k];for(let V in O)h(O[V].object),delete O[V];
delete D[k]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;let D=n[M.id];for(let k in D){let O=D[k];for(let V in O)h(O[V].object),delete O[V];delete D[k]}delete n[M.id]}function C(M){for(let D in n){let k=n[D];if(k[M.id]===void 0)continue;let O=k[M.id];for(let V in O)h(O[V].object),delete O[V];
delete k[M.id]}}function R(){b(),a=!0,r!==i&&(r=i,c(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:b,dispose:P,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function K0(s,t,e){
let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let m=0;m<u;m++)d+=h[m];e.update(d,n,1)}function l(c,h,u,f){
if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<c.length;m++)a(c[m],h[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_]*f[_];e.update(m,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=
l}function Q0(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==ze&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}
function o(C){let R=C===ln&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Tn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Xe&&!R)}function l(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(
s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",
h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.
MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),v=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),P=m>0,T=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,
getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:P,maxSamples:T}}function j0(s){
let t=this,e=null,n=0,i=!1,r=!1,a=new vn,o=new zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=
function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||m===null||m.length===0||r&&!g)r?h(null):c();else{let y=r?0:n,v=y*4,x=p.clippingState||null;l.value=x,x=h(m,f,v,d);for(let P=0;P!==v;++P)x[P]=e[P];p.clippingState=x,this.
numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,m){let _=u!==null?u.length:0,g=null;if(_!==0){if(g=l.value,m!==!0||g===null){let p=d+_*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(g===
null||g.length<p)&&(g=new Float32Array(p));for(let v=0,x=d;v!==_;++v,x+=4)a.copy(u[v]).applyMatrix4(y,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function tx(s){let t=new WeakMap;function e(a,o){return o===pr?a.mapping=Wn:o===mr&&
(a.mapping=oi),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===pr||o===mr)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new No(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.
mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var ci=class extends Rs{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=
!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,
this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.
offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,
i=(this.top+this.bottom)/2,r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.
projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=
this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ys=4,yf=[.125,.215,.35,.446,.526,.582],Ii=20,Ic=new ci,Mf=new ot,Pc=null,Dc=0,Lc=0,Uc=!1,Ri=(1+Math.sqrt(5))/2,fs=1/Ri,Sf=[new A(-Ri,fs,0),new A(Ri,fs,0),new A(-fs,0,Ri),new A(
fs,0,Ri),new A(0,Ri,-fs),new A(0,Ri,fs),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],wr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=
null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Pc=this._renderer.getRenderTarget(),Dc=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel(),Uc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this.
_allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&
(this._cubemapMaterial=Tf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ef(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),
this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<
this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Pc,Dc,Lc),this._renderer.xr.enabled=Uc,t.scissorTest=!1,Ma(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wn||t.mapping===oi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.
width):this._setSize(t.image.width/4),Pc=this._renderer.getRenderTarget(),Dc=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel(),Uc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this.
_cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ye,minFilter:ye,generateMipmaps:!1,type:ln,format:ze,colorSpace:Qi,depthBuffer:!1},i=bf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.
height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bf(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ex(r)),this._blurMaterial=nx(r,t,e)}return i}_compileMaterial(t){let e=new he(this._lodPlanes[0],t);this._renderer.
compile(e,Ic)}_sceneToCubeUV(t,e,n,i){let o=new ve(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Mf),h.toneMapping=kn,h.autoClear=!1;let d=new an({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1}),m=new he(new ki,d),_=!1,g=t.background;
g?g.isColor&&(d.color.copy(g),t.background=null,_=!0):(d.color.copy(Mf),_=!0);for(let p=0;p<6;p++){let y=p%3;y===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):y===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));let v=this._cubeSize;Ma(i,y*v,p>2?v:0,v,v),h.setRenderTarget(
i),_&&h.render(m,o),h.render(t,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Wn||t.mapping===oi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tf()),this._cubemapMaterial.uniforms.flipEnvMap.
value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ef());let r=i?this._cubemapMaterial:this._equirectMaterial,a=new he(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Ma(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ic)}_applyPMREM(t){
let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Sf[(i-r-1)%Sf.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){let a=this._pingPongRenderTarget;this.
_halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new he(this._lodPlanes[i],c),
f=c.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Ii-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):Ii;g>Ii&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ii}`);let p=[],y=0;for(let C=0;C<Ii;++C){let R=C/_,
b=Math.exp(-R*R/2);p.push(b),C===0?y+=b:C<g&&(y+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/y;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:v}=this;f.dTheta.value=m,f.mipInt.value=v-n;let x=this._sizeLods[i],P=3*
x*(i>v-ys?i-v+ys:0),T=4*(this._cubeSize-x);Ma(e,P,T,3*x,2*x),l.setRenderTarget(e),l.render(u,Ic)}};function ex(s){let t=[],e=[],n=[],i=s,r=s-ys+1+yf.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);e.push(o);let l=1/o;a>s-ys?l=yf[a-s+ys-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,
u,h,h,u,u,h,u],d=6,m=6,_=3,g=2,p=1,y=new Float32Array(_*m*d),v=new Float32Array(g*m*d),x=new Float32Array(p*m*d);for(let T=0;T<d;T++){let C=T%3*2/3-1,R=T>2?0:-1,b=[C,R,0,C+2/3,R,0,C+2/3,R+1,0,C,R,0,C+2/3,R+1,0,C,R+1,0];y.set(b,_*m*T),v.set(f,g*m*T);let M=[T,T,T,T,T,T];x.set(M,p*m*T)}let P=new Ft;P.setAttribute(
"position",new Qt(y,_)),P.setAttribute("uv",new Qt(v,g)),P.setAttribute("faceIndex",new Qt(x,p)),t.push(P),i>ys&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function bf(s,t,e){let n=new Me(s,t,e);return n.texture.mapping=Fs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ma(s,t,e,n,i){s.viewport.
set(t,e,n,i),s.scissor.set(t,e,n,i)}function nx(s,t,e){let n=new Float32Array(Ii),i=new A(0,1,0);return new ge({name:"SphericalGaussianBlur",defines:{n:Ii,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{
value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ou(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Ef(){return new ge({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ou(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Tf(){return new ge({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ou(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Ou(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ix(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===pr||l===mr,h=l===Wn||l===oi;if(c||h){let u=t.get(o),f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new wr(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(
o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{let d=o.image;return c&&d&&d.height>0||h&&d&&i(d)?(e===null&&(e=new wr(s)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.
texture):null}}}return o}function i(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}
function sx(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("E\
XT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension(
"WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){
e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&tr("THREE.WebGLRenderer: "+n+" extension not supported."),
i}}}function rx(s,t,e,n){let i={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let m in f.attributes)t.remove(f.attributes[m]);for(let m in f.morphAttributes){let _=f.morphAttributes[m];for(let g=0,p=_.length;g<p;g++)t.remove(_[g])}f.removeEventListener("dispose",
a),delete i[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function l(u){let f=u.
attributes;for(let m in f)t.update(f[m],s.ARRAY_BUFFER);let d=u.morphAttributes;for(let m in d){let _=d[m];for(let g=0,p=_.length;g<p;g++)t.update(_[g],s.ARRAY_BUFFER)}}function c(u){let f=[],d=u.index,m=u.attributes.position,_=0;if(d!==null){let y=d.array;_=d.version;for(let v=0,x=y.length;v<x;v+=3){
let P=y[v+0],T=y[v+1],C=y[v+2];f.push(P,T,T,C,C,P)}}else if(m!==void 0){let y=m.array;_=m.version;for(let v=0,x=y.length/3-1;v<x;v+=3){let P=v+0,T=v+1,C=v+2;f.push(P,T,T,C,C,P)}}else return;let g=new(yp(f)?Tr:Er)(f,1);g.version=_;let p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){let f=r.get(u);
if(f){let d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function ax(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){s.drawElements(n,d,r,f*a),e.update(d,n,1)}function c(f,d,m){m!==
0&&(s.drawElementsInstanced(n,d,r,f*a,m),e.update(d,n,m))}function h(f,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,m);let g=0;for(let p=0;p<m;p++)g+=d[p];e.update(g,n,1)}function u(f,d,m,_){if(m===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<
f.length;p++)c(f[p]/a,d[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,m);let p=0;for(let y=0;y<m;y++)p+=d[y]*_[y];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ox(s){let t={geometries:0,
textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.
error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function lx(s,t,e){let n=new WeakMap,i=new $t;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||
o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(o);if(f===void 0||f.count!==u){let b=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,
_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],v=0;d===!0&&(v=1),m===!0&&(v=2),_===!0&&(v=3);let x=o.attributes.position.count*v,P=1;x>t.maxTextureSize&&(P=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let T=new Float32Array(
x*P*4*u),C=new ws(T,x,P,u);C.type=Xe,C.needsUpdate=!0;let R=v*4;for(let M=0;M<u;M++){let D=g[M],k=p[M],O=y[M],V=x*P*4*M;for(let J=0;J<D.count;J++){let H=J*R;d===!0&&(i.fromBufferAttribute(D,J),T[V+H+0]=i.x,T[V+H+1]=i.y,T[V+H+2]=i.z,T[V+H+3]=0),m===!0&&(i.fromBufferAttribute(k,J),T[V+H+4]=i.x,T[V+H+5]=
i.y,T[V+H+6]=i.z,T[V+H+7]=0),_===!0&&(i.fromBufferAttribute(O,J),T[V+H+8]=i.x,T[V+H+9]=i.y,T[V+H+10]=i.z,T[V+H+11]=O.itemSize===4?i.w:1)}}f={count:u,texture:C,size:new X(x,P)},n.set(o,f),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morp\
hTexture",a.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];let m=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().
setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function cx(s,t,e,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(
l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function a(){i=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),
e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var Ar=class extends xe{constructor(t,e,n,i,r,a,o,l,c,h=Ni){if(h!==Ni&&h!==zi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ni&&
(n=Xn),n===void 0&&h===zi&&(n=Bi),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ae,this.minFilter=l!==void 0?l:Ae,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,
this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Tp=new xe,wf=new Ar(1,1),wp=new ws,Ap=new br,Cp=new Vi,Af=[],Cf=[],Rf=new Float32Array(16),If=new Float32Array(9),Pf=new Float32Array(4);function Os(s,t,e){let n=s[0];if(n<=0||n>0)return s;
let i=t*e,r=Af[i];if(r===void 0&&(r=new Float32Array(i),Af[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Se(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function be(s,t){for(let e=0,n=t.length;e<
n;e++)s[e]=t[e]}function nc(s,t){let e=Cf[t];e===void 0&&(e=new Int32Array(t),Cf[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function hx(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function ux(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&
(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2fv(this.addr,t),be(e,t)}}function fx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==
t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Se(e,t))return;s.uniform3fv(this.addr,t),be(e,t)}}function dx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=
t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4fv(this.addr,t),be(e,t)}}function px(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Se(e,n))return;Pf.set(n),s.uniformMatrix2fv(this.addr,!1,Pf),be(e,n)}}function mx(s,t){let e=this.
cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Se(e,n))return;If.set(n),s.uniformMatrix3fv(this.addr,!1,If),be(e,n)}}function gx(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{
if(Se(e,n))return;Rf.set(n),s.uniformMatrix4fv(this.addr,!1,Rf),be(e,n)}}function _x(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function xx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;
s.uniform2iv(this.addr,t),be(e,t)}}function vx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;s.uniform3iv(this.addr,t),be(e,t)}}function yx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==
t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4iv(this.addr,t),be(e,t)}}function Mx(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Sx(s,t){let e=this.cache;if(t.x!==void 0)
(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2uiv(this.addr,t),be(e,t)}}function bx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(
e,t))return;s.uniform3uiv(this.addr,t),be(e,t)}}function Ex(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4uiv(this.addr,t),be(e,t)}}function Tx(s,t,e){
let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(wf.compareFunction=Nu,r=wf):r=Tp,e.setTexture2D(t||r,i)}function wx(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(
t||Ap,i)}function Ax(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Cp,i)}function Cx(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||wp,i)}function Rx(s){switch(s){case 5126:
return hx;case 35664:return ux;case 35665:return fx;case 35666:return dx;case 35674:return px;case 35675:return mx;case 35676:return gx;case 5124:case 35670:return _x;case 35667:case 35671:return xx;case 35668:case 35672:return vx;case 35669:case 35673:return yx;case 5125:return Mx;case 36294:return Sx;case 36295:
return bx;case 36296:return Ex;case 35678:case 36198:case 36298:case 36306:case 35682:return Tx;case 35679:case 36299:case 36307:return wx;case 35680:case 36300:case 36308:case 36293:return Ax;case 36289:case 36303:case 36311:case 36292:return Cx}}function Ix(s,t){s.uniform1fv(this.addr,t)}function Px(s,t){
let e=Os(t,this.size,2);s.uniform2fv(this.addr,e)}function Dx(s,t){let e=Os(t,this.size,3);s.uniform3fv(this.addr,e)}function Lx(s,t){let e=Os(t,this.size,4);s.uniform4fv(this.addr,e)}function Ux(s,t){let e=Os(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Nx(s,t){let e=Os(t,this.size,9);
s.uniformMatrix3fv(this.addr,!1,e)}function Fx(s,t){let e=Os(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Ox(s,t){s.uniform1iv(this.addr,t)}function Bx(s,t){s.uniform2iv(this.addr,t)}function zx(s,t){s.uniform3iv(this.addr,t)}function kx(s,t){s.uniform4iv(this.addr,t)}function Vx(s,t){
s.uniform1uiv(this.addr,t)}function Hx(s,t){s.uniform2uiv(this.addr,t)}function Gx(s,t){s.uniform3uiv(this.addr,t)}function Wx(s,t){s.uniform4uiv(this.addr,t)}function Xx(s,t,e){let n=this.cache,i=t.length,r=nc(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),be(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||
Tp,r[a])}function qx(s,t,e){let n=this.cache,i=t.length,r=nc(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),be(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Ap,r[a])}function Yx(s,t,e){let n=this.cache,i=t.length,r=nc(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),be(n,r));for(let a=0;a!==i;++a)e.setTextureCube(
t[a]||Cp,r[a])}function Zx(s,t,e){let n=this.cache,i=t.length,r=nc(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),be(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||wp,r[a])}function Jx(s){switch(s){case 5126:return Ix;case 35664:return Px;case 35665:return Dx;case 35666:return Lx;case 35674:return Ux;case 35675:
return Nx;case 35676:return Fx;case 5124:case 35670:return Ox;case 35667:case 35671:return Bx;case 35668:case 35672:return zx;case 35669:case 35673:return kx;case 5125:return Vx;case 36294:return Hx;case 36295:return Gx;case 36296:return Wx;case 35678:case 36198:case 36298:case 36306:case 35682:return Xx;case 35679:case 36299:case 36307:
return qx;case 35680:case 36300:case 36308:case 36293:return Yx;case 36289:case 36303:case 36311:case 36292:return Zx}}var uh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Rx(e.type)}},fh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.
type=e.type,this.size=e.size,this.setValue=Jx(e.type)}},dh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(t,e[o.id],n)}}},Nc=/(\w+)(\])?(\[|\.)?/g;function Df(s,t){s.seq.push(t),s.map[t.id]=t}function $x(s,t,e){
let n=s.name,i=n.length;for(Nc.lastIndex=0;;){let r=Nc.exec(n),a=Nc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Df(e,c===void 0?new uh(o,s,t):new fh(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new dh(o),Df(e,u)),e=u}}}var bs=class{constructor(t,e){this.seq=[],
this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);$x(r,a,this)}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){
for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function Lf(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),
n}var Kx=37297,Qx=0;function jx(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Uf=new zt;function tv(s){qt._getMatrix(Uf,qt.workingColorSpace,s);let t=`mat3( ${Uf.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(s)){case jr:return[t,"LinearTransferOETF"];case jt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:\
 ",s),[t,"LinearTransferOETF"]}}function Nf(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+jx(s.getShaderSource(t),a)}else return i}function ev(s,t){let e=tv(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function nv(s,t){let e;switch(t){case Hl:e="Linear";break;case Gl:e="Reinhard";break;case Wl:e="Cineon";break;case Xl:e="ACESFilmic";break;case ql:e="AgX";break;case Yl:e="Neutral";break;case np:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"\
vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Sa=new A;function iv(){qt.getLuminanceCoefficients(Sa);let s=Sa.x.toFixed(4),t=Sa.y.toFixed(4),e=Sa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights\
, rgb );","}"].join(`
`)}function sv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nr).join(`
`)}function rv(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function av(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}
function nr(s){return s!==""}function Ff(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,
e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,
t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Of(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ov=/^[ \t]*#include +<([\w\d./]+)>/gm;function ph(s){return s.
replace(ov,cv)}var lv=new Map;function cv(s,t){let e=Wt[t];if(e===void 0){let n=lv.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ph(e)}var hv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Bf(s){return s.replace(hv,uv)}function uv(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function zf(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function fv(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===bu?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Nd?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===xn&&(t="SHADOWMAP_TYPE_VSM"),t}function dv(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Wn:case oi:
t="ENVMAP_TYPE_CUBE";break;case Fs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function pv(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case oi:t="ENVMAP_MODE_REFRACTION";break}return t}function mv(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Kr:t="ENVMAP_BLEND\
ING_MULTIPLY";break;case tp:t="ENVMAP_BLENDING_MIX";break;case ep:t="ENVMAP_BLENDING_ADD";break}return t}function gv(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function _v(s,t,e,n){let i=s.
getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=fv(e),c=dv(e),h=pv(e),u=mv(e),f=gv(e),d=sv(e),m=rv(r),_=i.createProgram(),g,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(nr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(nr).join(`
`),p.length>0&&(p+=`
`)):(g=[zf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define \
USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_A\
OMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":
"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEM\
AP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#defi\
ne USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?
"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#defin\
e BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?
"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?
"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?
"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?
"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?
"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_\
TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define \
USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;",
"uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#end\
if","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_C\
OLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nr).join(`
`),p=[zf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVM\
AP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?
"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define U\
SE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDE\
SCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?
"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define US\
E_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",
e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SID\
ED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?
"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==kn?"#define TONE_MAPPING":"",e.toneMapping!==
kn?Wt.tonemapping_pars_fragment:"",e.toneMapping!==kn?nv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,ev("linearToOutputTexel",e.outputColorSpace),iv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(nr).join(`
`)),a=ph(a),a=Ff(a,e),a=Of(a,e),o=ph(o),o=Ff(o,e),o=Of(o,e),a=Bf(a),o=Bf(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===nh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===nh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#defin\
e texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=y+g+a,x=y+p+o,P=Lf(i,i.VERTEX_SHADER,v),T=Lf(i,i.FRAGMENT_SHADER,x);i.attachShader(_,P),i.attachShader(_,T),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(D){if(s.debug.checkShaderErrors){
let k=i.getProgramInfoLog(_).trim(),O=i.getShaderInfoLog(P).trim(),V=i.getShaderInfoLog(T).trim(),J=!0,H=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(J=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,P,T);else{let et=Nf(i,P,"vertex"),G=Nf(i,T,"fragment");console.error("\
THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+k+`
`+et+`
`+G)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(O===""||V==="")&&(H=!1);H&&(D.diagnostics={runnable:J,programLog:k,vertexShader:{log:O,prefix:g},fragmentShader:{log:V,prefix:p}})}i.deleteShader(P),i.deleteShader(T),R=new bs(i,_),b=av(i,_)}let R;this.getUniforms=function(){return R===
void 0&&C(this),R};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,Kx)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=
void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Qx++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=T,this}var xv=0,mh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this.
_getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.
materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===
void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new gh(t),e.set(t,n)),n}},gh=class{constructor(t){this.id=xv++,this.code=t,this.usedTimes=0}};function vv(s,t,e,n,i,r,a){let o=new As,l=new mh,c=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures,
d=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"mat\
cap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,M,D,k,O){let V=k.fog,J=O.geometry,H=b.isMeshStandardMaterial?k.environment:null,et=(b.isMeshStandardMaterial?
e:t).get(b.envMap||H),G=et&&et.mapping===Fs?et.image.height:null,lt=m[b.type];b.precision!==null&&(d=i.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));let mt=J.morphAttributes.position||J.morphAttributes.
normal||J.morphAttributes.color,St=mt!==void 0?mt.length:0,kt=0;J.morphAttributes.position!==void 0&&(kt=1),J.morphAttributes.normal!==void 0&&(kt=2),J.morphAttributes.color!==void 0&&(kt=3);let ee,Z,it,bt;if(lt){let se=pn[lt];ee=se.vertexShader,Z=se.fragmentShader}else ee=b.vertexShader,Z=b.fragmentShader,
l.update(b),it=l.getVertexShaderID(b),bt=l.getFragmentShaderID(b);let rt=s.getRenderTarget(),It=s.state.buffers.depth.getReversed(),Ot=O.isInstancedMesh===!0,Lt=O.isBatchedMesh===!0,Jt=!!b.map,K=!!b.matcap,nt=!!et,I=!!b.aoMap,Ct=!!b.lightMap,j=!!b.bumpMap,vt=!!b.normalMap,at=!!b.displacementMap,Pt=!!b.
emissiveMap,_t=!!b.metalnessMap,w=!!b.roughnessMap,S=b.anisotropy>0,F=b.clearcoat>0,q=b.dispersion>0,Q=b.iridescence>0,Y=b.sheen>0,Et=b.transmission>0,ht=S&&!!b.anisotropyMap,xt=F&&!!b.clearcoatMap,Yt=F&&!!b.clearcoatNormalMap,tt=F&&!!b.clearcoatRoughnessMap,yt=Q&&!!b.iridescenceMap,Dt=Q&&!!b.iridescenceThicknessMap,
Nt=Y&&!!b.sheenColorMap,Mt=Y&&!!b.sheenRoughnessMap,Zt=!!b.specularMap,Xt=!!b.specularColorMap,ae=!!b.specularIntensityMap,L=Et&&!!b.transmissionMap,ut=Et&&!!b.thicknessMap,W=!!b.gradientMap,$=!!b.alphaMap,pt=b.alphaTest>0,ft=!!b.alphaHash,Ht=!!b.extensions,fe=kn;b.toneMapped&&(rt===null||rt.isXRRenderTarget===
!0)&&(fe=s.toneMapping);let Ie={shaderID:lt,shaderType:b.type,shaderName:b.name,vertexShader:ee,fragmentShader:Z,defines:b.defines,customVertexShaderID:it,customFragmentShaderID:bt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Lt,batchingColor:Lt&&O._colorsTexture!==
null,instancing:Ot,instancingColor:Ot&&O.instanceColor!==null,instancingMorph:Ot&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?s.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Qi,alphaToCoverage:!!b.alphaToCoverage,map:Jt,matcap:K,envMap:nt,envMapMode:nt&&
et.mapping,envMapCubeUVHeight:G,aoMap:I,lightMap:Ct,bumpMap:j,normalMap:vt,displacementMap:f&&at,emissiveMap:Pt,normalMapObjectSpace:vt&&b.normalMapType===fp,normalMapTangentSpace:vt&&b.normalMapType===fi,metalnessMap:_t,roughnessMap:w,anisotropy:S,anisotropyMap:ht,clearcoat:F,clearcoatMap:xt,clearcoatNormalMap:Yt,
clearcoatRoughnessMap:tt,dispersion:q,iridescence:Q,iridescenceMap:yt,iridescenceThicknessMap:Dt,sheen:Y,sheenColorMap:Nt,sheenRoughnessMap:Mt,specularMap:Zt,specularColorMap:Xt,specularIntensityMap:ae,transmission:Et,transmissionMap:L,thicknessMap:ut,gradientMap:W,opaque:b.transparent===!1&&b.blending===
Ui&&b.alphaToCoverage===!1,alphaMap:$,alphaTest:pt,alphaHash:ft,combine:b.combine,mapUv:Jt&&_(b.map.channel),aoMapUv:I&&_(b.aoMap.channel),lightMapUv:Ct&&_(b.lightMap.channel),bumpMapUv:j&&_(b.bumpMap.channel),normalMapUv:vt&&_(b.normalMap.channel),displacementMapUv:at&&_(b.displacementMap.channel),
emissiveMapUv:Pt&&_(b.emissiveMap.channel),metalnessMapUv:_t&&_(b.metalnessMap.channel),roughnessMapUv:w&&_(b.roughnessMap.channel),anisotropyMapUv:ht&&_(b.anisotropyMap.channel),clearcoatMapUv:xt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Yt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&
_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&_(b.sheenRoughnessMap.channel),specularMapUv:Zt&&_(b.specularMap.channel),specularColorMapUv:Xt&&
_(b.specularColorMap.channel),specularIntensityMapUv:ae&&_(b.specularIntensityMap.channel),transmissionMapUv:L&&_(b.transmissionMap.channel),thicknessMapUv:ut&&_(b.thicknessMap.channel),alphaMapUv:$&&_(b.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(vt||S),vertexColors:b.vertexColors,vertexAlphas:b.
vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!J.attributes.uv&&(Jt||$),fog:!!V,useFog:b.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:It,skinning:O.
isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:kt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.
spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,
numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:fe,decodeVideoTexture:Jt&&b.map.isVideoTexture===!0&&qt.getTransfer(b.map.colorSpace)===jt,decodeVideoTextureEmissive:Pt&&
b.emissiveMap.isVideoTexture===!0&&qt.getTransfer(b.emissiveMap.colorSpace)===jt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===yn,flipSided:b.side===ke,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ht&&
b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&b.extensions.multiDraw===!0||Lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ie.vertexUv1s=
c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function p(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let D in b.defines)M.push(D),M.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(y(
M,b),v(M,b),M.push(s.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function y(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),
b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),
b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),
b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),
b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function v(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(
5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&
o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&
o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.
transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function x(b){let M=m[b.type],D;if(M){let k=pn[M];D=Jn.clone(k.uniforms)}else
D=b.uniforms;return D}function P(b,M){let D;for(let k=0,O=h.length;k<O;k++){let V=h[k];if(V.cacheKey===M){D=V,++D.usedTimes;break}}return D===void 0&&(D=new _v(s,M,b,r),h.push(D)),D}function T(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(
b)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:P,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:R}}function yv(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){
s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Mv(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.
material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function kf(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Vf(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,f,d,m,_,g){
let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:m,renderOrder:u.renderOrder,z:_,group:g},s[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=_,p.group=g),t++,p}function o(u,f,d,m,_,g){let p=a(u,f,d,m,_,g);d.transmission>
0?n.push(p):d.transparent===!0?i.push(p):e.push(p)}function l(u,f,d,m,_,g){let p=a(u,f,d,m,_,g);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||Mv),n.length>1&&n.sort(f||kf),i.length>1&&i.sort(f||kf)}function h(){for(let u=t,f=s.length;u<
f;u++){let d=s[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function Sv(){let s=new WeakMap;function t(n,i){let r=s.get(n),a;return r===void 0?(a=new Vf,s.set(n,[a])):
i>=r.length?(a=new Vf,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function bv(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new ot};break;case"SpotLight":e={position:new A,direction:new A,
color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":e={color:new ot,position:new A,halfWidth:new A,halfHeight:new A};
break}return s[t.id]=e,e}}}function Ev(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new X};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,
shadowRadius:1,shadowMapSize:new X};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new X,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var Tv=0;function wv(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?
1:0)}function Av(s){let t=new bv,e=Ev(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],
directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(
new A);let i=new A,r=new Ut,a=new Ut;function o(c){let h=0,u=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,m=0,_=0,g=0,p=0,y=0,v=0,x=0,P=0,T=0,C=0;c.sort(wv);for(let b=0,M=c.length;b<M;b++){let D=c[b],k=D.color,O=D.intensity,V=D.distance,J=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.
isAmbientLight)h+=k.r*O,u+=k.g*O,f+=k.b*O;else if(D.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(D.sh.coefficients[H],O);C++}else if(D.isDirectionalLight){let H=t.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let et=D.shadow,G=e.get(D);G.shadowIntensity=et.
intensity,G.shadowBias=et.bias,G.shadowNormalBias=et.normalBias,G.shadowRadius=et.radius,G.shadowMapSize=et.mapSize,n.directionalShadow[d]=G,n.directionalShadowMap[d]=J,n.directionalShadowMatrix[d]=D.shadow.matrix,y++}n.directional[d]=H,d++}else if(D.isSpotLight){let H=t.get(D);H.position.setFromMatrixPosition(
D.matrixWorld),H.color.copy(k).multiplyScalar(O),H.distance=V,H.coneCos=Math.cos(D.angle),H.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),H.decay=D.decay,n.spot[_]=H;let et=D.shadow;if(D.map&&(n.spotLightMap[P]=D.map,P++,et.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[_]=et.matrix,D.castShadow){
let G=e.get(D);G.shadowIntensity=et.intensity,G.shadowBias=et.bias,G.shadowNormalBias=et.normalBias,G.shadowRadius=et.radius,G.shadowMapSize=et.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=J,x++}_++}else if(D.isRectAreaLight){let H=t.get(D);H.color.copy(k).multiplyScalar(O),H.halfWidth.set(D.width*.5,
0,0),H.halfHeight.set(0,D.height*.5,0),n.rectArea[g]=H,g++}else if(D.isPointLight){let H=t.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),H.distance=D.distance,H.decay=D.decay,D.castShadow){let et=D.shadow,G=e.get(D);G.shadowIntensity=et.intensity,G.shadowBias=et.bias,G.shadowNormalBias=
et.normalBias,G.shadowRadius=et.radius,G.shadowMapSize=et.mapSize,G.shadowCameraNear=et.camera.near,G.shadowCameraFar=et.camera.far,n.pointShadow[m]=G,n.pointShadowMap[m]=J,n.pointShadowMatrix[m]=D.shadow.matrix,v++}n.point[m]=H,m++}else if(D.isHemisphereLight){let H=t.get(D);H.skyColor.copy(D.color).
multiplyScalar(O),H.groundColor.copy(D.groundColor).multiplyScalar(O),n.hemi[p]=H,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;
let R=n.hash;(R.directionalLength!==d||R.pointLength!==m||R.spotLength!==_||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==y||R.numPointShadows!==v||R.numSpotShadows!==x||R.numSpotMaps!==P||R.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=g,n.point.
length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+P-T,n.spotLightMap.length=P,
n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,R.directionalLength=d,R.pointLength=m,R.spotLength=_,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=y,R.numPointShadows=v,R.numSpotShadows=x,R.numSpotMaps=P,R.numLightProbes=C,n.version=Tv++)}function l(c,h){let u=0,f=0,d=0,m=0,_=0,g=h.matrixWorldInverse;
for(let p=0,y=c.length;p<y;p++){let v=c[p];if(v.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),u++}else if(v.isSpotLight){let x=n.spot[d];x.position.setFromMatrixPosition(
v.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),d++}else if(v.isRectAreaLight){let x=n.rectArea[m];x.position.setFromMatrixPosition(v.matrixWorld),x.position.
applyMatrix4(g),a.identity(),r.copy(v.matrixWorld),r.premultiply(g),a.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(v.isPointLight){let x=n.point[f];x.position.setFromMatrixPosition(v.matrixWorld),
x.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:n}}function Hf(s){let t=new Av(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){
e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Cv(s){let t=new WeakMap;function e(i,r=0){
let a=t.get(i),o;return a===void 0?(o=new Hf(s),t.set(i,[o])):r>=a.length?(o=new Hf(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Cr=class extends we{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=hp,this.
map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,
this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Rr=class extends we{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.
alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},
Rv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Iv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Pv(s,t,e){let n=new Hi,i=new X,r=new X,a=new $t,o=new Cr({depthPacking:up}),l=new Rr,c={},h=e.maxTextureSize,u={[Gn]:ke,[ke]:Gn,[yn]:yn},f=new ge({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new X},radius:{value:4}},vertexShader:Rv,fragmentShader:Iv}),d=f.
clone();d.defines.HORIZONTAL_PASS=1;let m=new Ft;m.setAttribute("position",new Qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new he(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bu;let p=this.type;this.render=function(T,C,R){if(g.enabled===!1||g.autoUpdate===
!1&&g.needsUpdate===!1||T.length===0)return;let b=s.getRenderTarget(),M=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),k=s.state;k.setBlending(mn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let O=p!==xn&&this.type===xn,V=p===xn&&this.type!==xn;for(let J=0,H=T.
length;J<H;J++){let et=T[J],G=et.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);let lt=G.getFrameExtents();if(i.multiply(lt),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/lt.x),
i.x=r.x*lt.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/lt.y),i.y=r.y*lt.y,G.mapSize.y=r.y)),G.map===null||O===!0||V===!0){let St=this.type!==xn?{minFilter:Ae,magFilter:Ae}:{};G.map!==null&&G.map.dispose(),G.map=new Me(i.x,i.y,St),G.map.texture.name=et.name+".shadowMap",G.camera.updateProjectionMatrix()}
s.setRenderTarget(G.map),s.clear();let mt=G.getViewportCount();for(let St=0;St<mt;St++){let kt=G.getViewport(St);a.set(r.x*kt.x,r.y*kt.y,r.x*kt.z,r.y*kt.w),k.viewport(a),G.updateMatrices(et,St),n=G.getFrustum(),x(C,R,G.camera,et,this.type)}G.isPointLightShadow!==!0&&this.type===xn&&y(G,R),G.needsUpdate=
!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(b,M,D)};function y(T,C){let R=t.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Me(i.x,i.y)),f.uniforms.shadow_pass.
value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(C,null,R,f,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(
T.map),s.clear(),s.renderBufferDirect(C,null,R,d,_,null)}function v(T,C,R,b){let M=null,D=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)M=D;else if(M=R.isPointLight===!0?l:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.
length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let k=M.uuid,O=C.uuid,V=c[k];V===void 0&&(V={},c[k]=V);let J=V[O];J===void 0&&(J=M.clone(),V[O]=J,C.addEventListener("dispose",P)),M=J}if(M.visible=C.visible,M.wireframe=C.wireframe,b===xn?M.side=
C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:u[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=
C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let k=s.properties.get(M);k.light=R}return M}function x(T,C,R,b,M){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||
T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===xn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);let O=t.update(T),V=T.material;if(Array.isArray(V)){let J=O.groups;for(let H=0,et=J.length;H<et;H++){let G=J[H],lt=V[G.materialIndex];
if(lt&&lt.visible){let mt=v(T,lt,b,M);T.onBeforeShadow(s,T,C,R,O,mt,G),s.renderBufferDirect(R,null,O,mt,T,G),T.onAfterShadow(s,T,C,R,O,mt,G)}}}else if(V.visible){let J=v(T,V,b,M);T.onBeforeShadow(s,T,C,R,O,J,null),s.renderBufferDirect(R,null,O,J,T,null),T.onAfterShadow(s,T,C,R,O,J,null)}}let k=T.children;
for(let O=0,V=k.length;O<V;O++)x(k[O],C,R,b,M)}function P(T){T.target.removeEventListener("dispose",P);for(let R in c){let b=c[R],M=T.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var Dv={[Ka]:Qa,[ja]:no,[to]:io,[Oi]:eo,[Qa]:Ka,[no]:ja,[io]:to,[eo]:Oi};function Lv(s,t){function e(){let L=!1,ut=new $t,
W=null,$=new $t(0,0,0,0);return{setMask:function(pt){W!==pt&&!L&&(s.colorMask(pt,pt,pt,pt),W=pt)},setLocked:function(pt){L=pt},setClear:function(pt,ft,Ht,fe,Ie){Ie===!0&&(pt*=fe,ft*=fe,Ht*=fe),ut.set(pt,ft,Ht,fe),$.equals(ut)===!1&&(s.clearColor(pt,ft,Ht,fe),$.copy(ut))},reset:function(){L=!1,W=null,
$.set(-1,0,0,0)}}}function n(){let L=!1,ut=!1,W=null,$=null,pt=null;return{setReversed:function(ft){if(ut!==ft){let Ht=t.get("EXT_clip_control");ut?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT);let fe=pt;pt=null,this.setClear(
fe)}ut=ft},getReversed:function(){return ut},setTest:function(ft){ft?rt(s.DEPTH_TEST):It(s.DEPTH_TEST)},setMask:function(ft){W!==ft&&!L&&(s.depthMask(ft),W=ft)},setFunc:function(ft){if(ut&&(ft=Dv[ft]),$!==ft){switch(ft){case Ka:s.depthFunc(s.NEVER);break;case Qa:s.depthFunc(s.ALWAYS);break;case ja:s.
depthFunc(s.LESS);break;case Oi:s.depthFunc(s.LEQUAL);break;case to:s.depthFunc(s.EQUAL);break;case eo:s.depthFunc(s.GEQUAL);break;case no:s.depthFunc(s.GREATER);break;case io:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}$=ft}},setLocked:function(ft){L=ft},setClear:function(ft){pt!==ft&&
(ut&&(ft=1-ft),s.clearDepth(ft),pt=ft)},reset:function(){L=!1,W=null,$=null,pt=null,ut=!1}}}function i(){let L=!1,ut=null,W=null,$=null,pt=null,ft=null,Ht=null,fe=null,Ie=null;return{setTest:function(se){L||(se?rt(s.STENCIL_TEST):It(s.STENCIL_TEST))},setMask:function(se){ut!==se&&!L&&(s.stencilMask(
se),ut=se)},setFunc:function(se,cn,Cn){(W!==se||$!==cn||pt!==Cn)&&(s.stencilFunc(se,cn,Cn),W=se,$=cn,pt=Cn)},setOp:function(se,cn,Cn){(ft!==se||Ht!==cn||fe!==Cn)&&(s.stencilOp(se,cn,Cn),ft=se,Ht=cn,fe=Cn)},setLocked:function(se){L=se},setClear:function(se){Ie!==se&&(s.clearStencil(se),Ie=se)},reset:function(){
L=!1,ut=null,W=null,$=null,pt=null,ft=null,Ht=null,fe=null,Ie=null}}}let r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap,h={},u={},f=new WeakMap,d=[],m=null,_=!1,g=null,p=null,y=null,v=null,x=null,P=null,T=null,C=new ot(0,0,0),R=0,b=!1,M=null,D=null,k=null,O=null,V=null,J=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
H=!1,et=0,G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(G)[1]),H=et>=1):G.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),H=et>=2);let lt=null,mt={},St=s.getParameter(s.SCISSOR_BOX),kt=s.getParameter(s.VIEWPORT),ee=new $t().fromArray(St),
Z=new $t().fromArray(kt);function it(L,ut,W,$){let pt=new Uint8Array(4),ft=s.createTexture();s.bindTexture(L,ft),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ht=0;Ht<W;Ht++)L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY?s.texImage3D(ut,0,s.RGBA,
1,1,$,0,s.RGBA,s.UNSIGNED_BYTE,pt):s.texImage2D(ut+Ht,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pt);return ft}let bt={};bt[s.TEXTURE_2D]=it(s.TEXTURE_2D,s.TEXTURE_2D,1),bt[s.TEXTURE_CUBE_MAP]=it(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),bt[s.TEXTURE_2D_ARRAY]=it(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,
1,1),bt[s.TEXTURE_3D]=it(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),rt(s.DEPTH_TEST),a.setFunc(Oi),j(!1),vt(Kc),rt(s.CULL_FACE),I(mn);function rt(L){h[L]!==!0&&(s.enable(L),h[L]=!0)}function It(L){h[L]!==!1&&(s.disable(L),h[L]=!1)}function Ot(L,ut){return u[L]!==ut?
(s.bindFramebuffer(L,ut),u[L]=ut,L===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ut),L===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ut),!0):!1}function Lt(L,ut){let W=d,$=!1;if(L){W=f.get(ut),W===void 0&&(W=[],f.set(ut,W));let pt=L.textures;if(W.length!==pt.length||W[0]!==s.COLOR_ATTACHMENT0){for(let ft=0,Ht=pt.
length;ft<Ht;ft++)W[ft]=s.COLOR_ATTACHMENT0+ft;W.length=pt.length,$=!0}}else W[0]!==s.BACK&&(W[0]=s.BACK,$=!0);$&&s.drawBuffers(W)}function Jt(L){return m!==L?(s.useProgram(L),m=L,!0):!1}let K={[ri]:s.FUNC_ADD,[Od]:s.FUNC_SUBTRACT,[Bd]:s.FUNC_REVERSE_SUBTRACT};K[zd]=s.MIN,K[kd]=s.MAX;let nt={[Vd]:s.
ZERO,[Hd]:s.ONE,[Gd]:s.SRC_COLOR,[Ja]:s.SRC_ALPHA,[Jd]:s.SRC_ALPHA_SATURATE,[Yd]:s.DST_COLOR,[Xd]:s.DST_ALPHA,[Wd]:s.ONE_MINUS_SRC_COLOR,[$a]:s.ONE_MINUS_SRC_ALPHA,[Zd]:s.ONE_MINUS_DST_COLOR,[qd]:s.ONE_MINUS_DST_ALPHA,[$d]:s.CONSTANT_COLOR,[Kd]:s.ONE_MINUS_CONSTANT_COLOR,[Qd]:s.CONSTANT_ALPHA,[jd]:s.
ONE_MINUS_CONSTANT_ALPHA};function I(L,ut,W,$,pt,ft,Ht,fe,Ie,se){if(L===mn){_===!0&&(It(s.BLEND),_=!1);return}if(_===!1&&(rt(s.BLEND),_=!0),L!==Fd){if(L!==g||se!==b){if((p!==ri||x!==ri)&&(s.blendEquation(s.FUNC_ADD),p=ri,x=ri),se)switch(L){case Ui:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,
s.ONE_MINUS_SRC_ALPHA);break;case dr:s.blendFunc(s.ONE,s.ONE);break;case Qc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case jc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Ui:
s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case dr:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Qc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case jc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: In\
valid blending: ",L);break}y=null,v=null,P=null,T=null,C.set(0,0,0),R=0,g=L,b=se}return}pt=pt||ut,ft=ft||W,Ht=Ht||$,(ut!==p||pt!==x)&&(s.blendEquationSeparate(K[ut],K[pt]),p=ut,x=pt),(W!==y||$!==v||ft!==P||Ht!==T)&&(s.blendFuncSeparate(nt[W],nt[$],nt[ft],nt[Ht]),y=W,v=$,P=ft,T=Ht),(fe.equals(C)===!1||
Ie!==R)&&(s.blendColor(fe.r,fe.g,fe.b,Ie),C.copy(fe),R=Ie),g=L,b=!1}function Ct(L,ut){L.side===yn?It(s.CULL_FACE):rt(s.CULL_FACE);let W=L.side===ke;ut&&(W=!W),j(W),L.blending===Ui&&L.transparent===!1?I(mn):I(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,
L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);let $=L.stencilWrite;o.setTest($),$&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,
L.stencilZPass)),Pt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?rt(s.SAMPLE_ALPHA_TO_COVERAGE):It(s.SAMPLE_ALPHA_TO_COVERAGE)}function j(L){M!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),M=L)}function vt(L){L!==Ld?(rt(s.CULL_FACE),L!==D&&(L===Kc?s.cullFace(s.BACK):
L===Ud?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):It(s.CULL_FACE),D=L}function at(L){L!==k&&(H&&s.lineWidth(L),k=L)}function Pt(L,ut,W){L?(rt(s.POLYGON_OFFSET_FILL),(O!==ut||V!==W)&&(s.polygonOffset(ut,W),O=ut,V=W)):It(s.POLYGON_OFFSET_FILL)}function _t(L){L?rt(s.SCISSOR_TEST):It(s.SCISSOR_TEST)}
function w(L){L===void 0&&(L=s.TEXTURE0+J-1),lt!==L&&(s.activeTexture(L),lt=L)}function S(L,ut,W){W===void 0&&(lt===null?W=s.TEXTURE0+J-1:W=lt);let $=mt[W];$===void 0&&($={type:void 0,texture:void 0},mt[W]=$),($.type!==L||$.texture!==ut)&&(lt!==W&&(s.activeTexture(W),lt=W),s.bindTexture(L,ut||bt[L]),
$.type=L,$.texture=ut)}function F(){let L=mt[lt];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function q(){try{s.compressedTexImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{s.compressedTexImage3D.apply(s,arguments)}catch(L){
console.error("THREE.WebGLState:",L)}}function Y(){try{s.texSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Et(){try{s.texSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ht(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(L){
console.error("THREE.WebGLState:",L)}}function xt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Yt(){try{s.texStorage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{s.texStorage3D.apply(s,arguments)}catch(L){
console.error("THREE.WebGLState:",L)}}function yt(){try{s.texImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Dt(){try{s.texImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Nt(L){ee.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),ee.copy(
L))}function Mt(L){Z.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),Z.copy(L))}function Zt(L,ut){let W=c.get(ut);W===void 0&&(W=new WeakMap,c.set(ut,W));let $=W.get(L);$===void 0&&($=s.getUniformBlockIndex(ut,L.name),W.set(L,$))}function Xt(L,ut){let $=c.get(ut).get(L);l.get(ut)!==$&&(s.uniformBlockBinding(
ut,$,L.__bindingPointIndex),l.set(ut,$))}function ae(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.
blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.
cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(
0,0,s.canvas.width,s.canvas.height),h={},lt=null,mt={},u={},f=new WeakMap,d=[],m=null,_=!1,g=null,p=null,y=null,v=null,x=null,P=null,T=null,C=new ot(0,0,0),R=0,b=!1,M=null,D=null,k=null,O=null,V=null,ee.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),
o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:rt,disable:It,bindFramebuffer:Ot,drawBuffers:Lt,useProgram:Jt,setBlending:I,setMaterial:Ct,setFlipSided:j,setCullFace:vt,setLineWidth:at,setPolygonOffset:Pt,setScissorTest:_t,activeTexture:w,bindTexture:S,unbindTexture:F,compressedTexImage2D:q,
compressedTexImage3D:Q,texImage2D:yt,texImage3D:Dt,updateUBOMapping:Zt,uniformBlockBinding:Xt,texStorage2D:Yt,texStorage3D:tt,texSubImage2D:Y,texSubImage3D:Et,compressedTexSubImage2D:ht,compressedTexSubImage3D:xt,scissor:Nt,viewport:Mt,reset:ae}}function Uv(s,t){let e=s.image&&s.image.width?s.image.
width/s.image.height:1;return e>t?(s.repeat.x=1,s.repeat.y=e/t,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=t/e,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function Nv(s,t){let e=s.image&&s.image.width?s.image.width/s.image.height:1;return e>t?(s.repeat.x=t/e,s.repeat.y=1,s.offset.
x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=e/t,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function Fv(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function _h(s,t,e,n){let i=Ov(n);switch(e){case Cu:return s*t;case Iu:return s*t;case Pu:return s*t*2;case Ql:return s*
t/i.components*i.byteLength;case Qr:return s*t/i.components*i.byteLength;case Du:return s*t*2/i.components*i.byteLength;case jl:return s*t*2/i.components*i.byteLength;case Ru:return s*t*3/i.components*i.byteLength;case ze:return s*t*4/i.components*i.byteLength;case tc:return s*t*4/i.components*i.byteLength;case sr:case rr:
return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ar:case or:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ro:case oo:return Math.max(s,16)*Math.max(t,8)/4;case so:case ao:return Math.max(s,8)*Math.max(t,8)/2;case lo:case co:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ho:return Math.
floor((s+3)/4)*Math.floor((t+3)/4)*16;case uo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case fo:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case po:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case mo:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case go:return Math.floor((s+5)/
6)*Math.floor((t+5)/6)*16;case _o:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case xo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case vo:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case yo:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Mo:return Math.floor((s+9)/10)*Math.
floor((t+5)/6)*16;case So:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case bo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Eo:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case To:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case lr:case wo:case Ao:return Math.ceil(
s/4)*Math.ceil(t/4)*16;case Lu:case Co:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Ro:case Io:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ov(s){switch(s){case Tn:case Tu:return{byteLength:1,components:1};case Es:case wu:case ln:
return{byteLength:2,components:1};case $l:case Kl:return{byteLength:2,components:4};case Xn:case Jl:case Xe:return{byteLength:4,components:1};case Au:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}var Bv={contain:Uv,cover:Nv,fill:Fv,getByteLength:_h};function zv(s,t,e,n,i,r,a){
let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new X,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}
function m(w,S){return d?new OffscreenCanvas(w,S):Sr("canvas")}function _(w,S,F){let q=1,Q=_t(w);if((Q.width>F||Q.height>F)&&(q=F/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<
"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let Y=Math.floor(q*Q.width),Et=Math.floor(q*Q.height);u===void 0&&(u=m(Y,Et));let ht=S?m(Y,Et):u;return ht.width=Y,ht.height=Et,ht.getContext("2d").drawImage(w,0,0,Y,Et),console.warn("THREE.WebGLRenderer: Texture has been\
 resized from ("+Q.width+"x"+Q.height+") to ("+Y+"x"+Et+")."),ht}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function g(w){return w.generateMipmaps}function p(w){s.generateMipmap(w)}function y(w){return w.isWebGLCubeRenderTarget?
s.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?s.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(w,S,F,q,Q=!1){if(w!==null){if(s[w]!==void 0)return s[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+
"'")}let Y=S;if(S===s.RED&&(F===s.FLOAT&&(Y=s.R32F),F===s.HALF_FLOAT&&(Y=s.R16F),F===s.UNSIGNED_BYTE&&(Y=s.R8)),S===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(Y=s.R8UI),F===s.UNSIGNED_SHORT&&(Y=s.R16UI),F===s.UNSIGNED_INT&&(Y=s.R32UI),F===s.BYTE&&(Y=s.R8I),F===s.SHORT&&(Y=s.R16I),F===s.INT&&(Y=s.R32I)),S===
s.RG&&(F===s.FLOAT&&(Y=s.RG32F),F===s.HALF_FLOAT&&(Y=s.RG16F),F===s.UNSIGNED_BYTE&&(Y=s.RG8)),S===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&(Y=s.RG8UI),F===s.UNSIGNED_SHORT&&(Y=s.RG16UI),F===s.UNSIGNED_INT&&(Y=s.RG32UI),F===s.BYTE&&(Y=s.RG8I),F===s.SHORT&&(Y=s.RG16I),F===s.INT&&(Y=s.RG32I)),S===s.RGB_INTEGER&&
(F===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),F===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),F===s.UNSIGNED_INT&&(Y=s.RGB32UI),F===s.BYTE&&(Y=s.RGB8I),F===s.SHORT&&(Y=s.RGB16I),F===s.INT&&(Y=s.RGB32I)),S===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),F===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),F===s.UNSIGNED_INT&&(Y=s.RGBA32UI),
F===s.BYTE&&(Y=s.RGBA8I),F===s.SHORT&&(Y=s.RGBA16I),F===s.INT&&(Y=s.RGBA32I)),S===s.RGB&&F===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),S===s.RGBA){let Et=Q?jr:qt.getTransfer(q);F===s.FLOAT&&(Y=s.RGBA32F),F===s.HALF_FLOAT&&(Y=s.RGBA16F),F===s.UNSIGNED_BYTE&&(Y=Et===jt?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&
(Y=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function x(w,S){let F;return w?S===null||S===Xn||S===Bi?F=s.DEPTH24_STENCIL8:S===Xe?F=s.DEPTH32F_STENCIL8:S===Es&&(F=s.DEPTH24_STENCIL8,
console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Xn||S===Bi?F=s.DEPTH_COMPONENT24:S===Xe?F=s.DEPTH_COMPONENT32F:S===Es&&(F=s.DEPTH_COMPONENT16),F}function P(w,S){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ae&&w.
minFilter!==ye?Math.log2(Math.max(S.width,S.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?S.mipmaps.length:1}function T(w){let S=w.target;S.removeEventListener("dispose",T),R(S),S.isVideoTexture&&h.delete(S)}function C(w){let S=w.target;
S.removeEventListener("dispose",C),M(S)}function R(w){let S=n.get(w);if(S.__webglInit===void 0)return;let F=w.source,q=f.get(F);if(q){let Q=q[S.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&b(w),Object.keys(q).length===0&&f.delete(F)}n.remove(w)}function b(w){let S=n.get(w);s.deleteTexture(S.__webglTexture);
let F=w.source,q=f.get(F);delete q[S.__cacheKey],a.memory.textures--}function M(w){let S=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(S.__webglFramebuffer[q]))for(let Q=0;Q<S.__webglFramebuffer[q].length;Q++)
s.deleteFramebuffer(S.__webglFramebuffer[q][Q]);else s.deleteFramebuffer(S.__webglFramebuffer[q]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[q])}else{if(Array.isArray(S.__webglFramebuffer))for(let q=0;q<S.__webglFramebuffer.length;q++)s.deleteFramebuffer(S.__webglFramebuffer[q]);else
s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let q=0;q<S.__webglColorRenderbuffer.length;q++)S.__webglColorRenderbuffer[q]&&
s.deleteRenderbuffer(S.__webglColorRenderbuffer[q]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let F=w.textures;for(let q=0,Q=F.length;q<Q;q++){let Y=n.get(F[q]);Y.__webglTexture&&(s.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(F[q])}n.remove(w)}let D=0;
function k(){D=0}function O(){let w=D;return w>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),D+=1,w}function V(w){let S=[];return S.push(w.wrapS),S.push(w.wrapT),S.push(w.wrapR||0),S.push(w.magFilter),S.push(w.minFilter),
S.push(w.anisotropy),S.push(w.internalFormat),S.push(w.format),S.push(w.type),S.push(w.generateMipmaps),S.push(w.premultiplyAlpha),S.push(w.flipY),S.push(w.unpackAlignment),S.push(w.colorSpace),S.join()}function J(w,S){let F=n.get(w);if(w.isVideoTexture&&at(w),w.isRenderTargetTexture===!1&&w.version>
0&&F.__version!==w.version){let q=w.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(F,w,S);return}}e.bindTexture(s.TEXTURE_2D,
F.__webglTexture,s.TEXTURE0+S)}function H(w,S){let F=n.get(w);if(w.version>0&&F.__version!==w.version){Z(F,w,S);return}e.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+S)}function et(w,S){let F=n.get(w);if(w.version>0&&F.__version!==w.version){Z(F,w,S);return}e.bindTexture(s.TEXTURE_3D,F.
__webglTexture,s.TEXTURE0+S)}function G(w,S){let F=n.get(w);if(w.version>0&&F.__version!==w.version){it(F,w,S);return}e.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+S)}let lt={[gr]:s.REPEAT,[nn]:s.CLAMP_TO_EDGE,[_r]:s.MIRRORED_REPEAT},mt={[Ae]:s.NEAREST,[Eu]:s.NEAREST_MIPMAP_NEAREST,[xs]:s.
NEAREST_MIPMAP_LINEAR,[ye]:s.LINEAR,[ir]:s.LINEAR_MIPMAP_NEAREST,[Sn]:s.LINEAR_MIPMAP_LINEAR},St={[dp]:s.NEVER,[vp]:s.ALWAYS,[pp]:s.LESS,[Nu]:s.LEQUAL,[mp]:s.EQUAL,[xp]:s.GEQUAL,[gp]:s.GREATER,[_p]:s.NOTEQUAL};function kt(w,S){if(S.type===Xe&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===ye||
S.magFilter===ir||S.magFilter===xs||S.magFilter===Sn||S.minFilter===ye||S.minFilter===ir||S.minFilter===xs||S.minFilter===Sn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(w,s.
TEXTURE_WRAP_S,lt[S.wrapS]),s.texParameteri(w,s.TEXTURE_WRAP_T,lt[S.wrapT]),(w===s.TEXTURE_3D||w===s.TEXTURE_2D_ARRAY)&&s.texParameteri(w,s.TEXTURE_WRAP_R,lt[S.wrapR]),s.texParameteri(w,s.TEXTURE_MAG_FILTER,mt[S.magFilter]),s.texParameteri(w,s.TEXTURE_MIN_FILTER,mt[S.minFilter]),S.compareFunction&&(s.
texParameteri(w,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(w,s.TEXTURE_COMPARE_FUNC,St[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ae||S.minFilter!==xs&&S.minFilter!==Sn||S.type===Xe&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>
1||n.get(S).__currentAnisotropy){let F=t.get("EXT_texture_filter_anisotropic");s.texParameterf(w,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function ee(w,S){let F=!1;w.__webglInit===void 0&&(w.__webglInit=!0,S.addEventListener(
"dispose",T));let q=S.source,Q=f.get(q);Q===void 0&&(Q={},f.set(q,Q));let Y=V(S);if(Y!==w.__cacheKey){Q[Y]===void 0&&(Q[Y]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Q[Y].usedTimes++;let Et=Q[w.__cacheKey];Et!==void 0&&(Q[w.__cacheKey].usedTimes--,Et.usedTimes===0&&b(S)),w.__cacheKey=
Y,w.__webglTexture=Q[Y].texture}return F}function Z(w,S,F){let q=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(q=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(q=s.TEXTURE_3D);let Q=ee(w,S),Y=S.source;e.bindTexture(q,w.__webglTexture,s.TEXTURE0+F);let Et=n.get(Y);if(Y.version!==Et.__version||
Q===!0){e.activeTexture(s.TEXTURE0+F);let ht=qt.getPrimaries(qt.workingColorSpace),xt=S.colorSpace===Fn?null:qt.getPrimaries(S.colorSpace),Yt=S.colorSpace===Fn||ht===xt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),
s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let tt=_(S.image,!1,i.maxTextureSize);tt=Pt(S,tt);let yt=r.convert(S.format,S.colorSpace),Dt=r.convert(S.type),Nt=v(S.internalFormat,yt,Dt,S.colorSpace,S.isVideoTexture);kt(q,S);let Mt,Zt=S.mipmaps,
Xt=S.isVideoTexture!==!0,ae=Et.__version===void 0||Q===!0,L=Y.dataReady,ut=P(S,tt);if(S.isDepthTexture)Nt=x(S.format===zi,S.type),ae&&(Xt?e.texStorage2D(s.TEXTURE_2D,1,Nt,tt.width,tt.height):e.texImage2D(s.TEXTURE_2D,0,Nt,tt.width,tt.height,0,yt,Dt,null));else if(S.isDataTexture)if(Zt.length>0){Xt&&
ae&&e.texStorage2D(s.TEXTURE_2D,ut,Nt,Zt[0].width,Zt[0].height);for(let W=0,$=Zt.length;W<$;W++)Mt=Zt[W],Xt?L&&e.texSubImage2D(s.TEXTURE_2D,W,0,0,Mt.width,Mt.height,yt,Dt,Mt.data):e.texImage2D(s.TEXTURE_2D,W,Nt,Mt.width,Mt.height,0,yt,Dt,Mt.data);S.generateMipmaps=!1}else Xt?(ae&&e.texStorage2D(s.TEXTURE_2D,
ut,Nt,tt.width,tt.height),L&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,tt.width,tt.height,yt,Dt,tt.data)):e.texImage2D(s.TEXTURE_2D,0,Nt,tt.width,tt.height,0,yt,Dt,tt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Xt&&ae&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ut,Nt,Zt[0].width,Zt[0].height,
tt.depth);for(let W=0,$=Zt.length;W<$;W++)if(Mt=Zt[W],S.format!==ze)if(yt!==null)if(Xt){if(L)if(S.layerUpdates.size>0){let pt=_h(Mt.width,Mt.height,S.format,S.type);for(let ft of S.layerUpdates){let Ht=Mt.data.subarray(ft*pt/Mt.data.BYTES_PER_ELEMENT,(ft+1)*pt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(
s.TEXTURE_2D_ARRAY,W,0,0,ft,Mt.width,Mt.height,1,yt,Ht)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,0,Mt.width,Mt.height,tt.depth,yt,Mt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,W,Nt,Mt.width,Mt.height,tt.depth,0,Mt.data,0,0);else console.warn("THREE.WebG\
LRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?L&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,W,0,0,0,Mt.width,Mt.height,tt.depth,yt,Dt,Mt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,W,Nt,Mt.width,Mt.height,tt.depth,0,yt,Dt,Mt.data)}else{Xt&&ae&&e.texStorage2D(s.TEXTURE_2D,
ut,Nt,Zt[0].width,Zt[0].height);for(let W=0,$=Zt.length;W<$;W++)Mt=Zt[W],S.format!==ze?yt!==null?Xt?L&&e.compressedTexSubImage2D(s.TEXTURE_2D,W,0,0,Mt.width,Mt.height,yt,Mt.data):e.compressedTexImage2D(s.TEXTURE_2D,W,Nt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load\
 unsupported compressed texture format in .uploadTexture()"):Xt?L&&e.texSubImage2D(s.TEXTURE_2D,W,0,0,Mt.width,Mt.height,yt,Dt,Mt.data):e.texImage2D(s.TEXTURE_2D,W,Nt,Mt.width,Mt.height,0,yt,Dt,Mt.data)}else if(S.isDataArrayTexture)if(Xt){if(ae&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ut,Nt,tt.width,tt.height,
tt.depth),L)if(S.layerUpdates.size>0){let W=_h(tt.width,tt.height,S.format,S.type);for(let $ of S.layerUpdates){let pt=tt.data.subarray($*W/tt.data.BYTES_PER_ELEMENT,($+1)*W/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,$,tt.width,tt.height,1,yt,Dt,pt)}S.clearLayerUpdates()}else
e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,yt,Dt,tt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Nt,tt.width,tt.height,tt.depth,0,yt,Dt,tt.data);else if(S.isData3DTexture)Xt?(ae&&e.texStorage3D(s.TEXTURE_3D,ut,Nt,tt.width,tt.height,tt.depth),L&&e.texSubImage3D(s.TEXTURE_3D,
0,0,0,0,tt.width,tt.height,tt.depth,yt,Dt,tt.data)):e.texImage3D(s.TEXTURE_3D,0,Nt,tt.width,tt.height,tt.depth,0,yt,Dt,tt.data);else if(S.isFramebufferTexture){if(ae)if(Xt)e.texStorage2D(s.TEXTURE_2D,ut,Nt,tt.width,tt.height);else{let W=tt.width,$=tt.height;for(let pt=0;pt<ut;pt++)e.texImage2D(s.TEXTURE_2D,
pt,Nt,W,$,0,yt,Dt,null),W>>=1,$>>=1}}else if(Zt.length>0){if(Xt&&ae){let W=_t(Zt[0]);e.texStorage2D(s.TEXTURE_2D,ut,Nt,W.width,W.height)}for(let W=0,$=Zt.length;W<$;W++)Mt=Zt[W],Xt?L&&e.texSubImage2D(s.TEXTURE_2D,W,0,0,yt,Dt,Mt):e.texImage2D(s.TEXTURE_2D,W,Nt,yt,Dt,Mt);S.generateMipmaps=!1}else if(Xt){
if(ae){let W=_t(tt);e.texStorage2D(s.TEXTURE_2D,ut,Nt,W.width,W.height)}L&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,yt,Dt,tt)}else e.texImage2D(s.TEXTURE_2D,0,Nt,yt,Dt,tt);g(S)&&p(q),Et.__version=Y.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function it(w,S,F){if(S.image.length!==6)return;let q=ee(
w,S),Q=S.source;e.bindTexture(s.TEXTURE_CUBE_MAP,w.__webglTexture,s.TEXTURE0+F);let Y=n.get(Q);if(Q.version!==Y.__version||q===!0){e.activeTexture(s.TEXTURE0+F);let Et=qt.getPrimaries(qt.workingColorSpace),ht=S.colorSpace===Fn?null:qt.getPrimaries(S.colorSpace),xt=S.colorSpace===Fn||Et===ht?s.NONE:s.
BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let Yt=S.isCompressedTexture||S.image[0].isCompressedTexture,
tt=S.image[0]&&S.image[0].isDataTexture,yt=[];for(let $=0;$<6;$++)!Yt&&!tt?yt[$]=_(S.image[$],!0,i.maxCubemapSize):yt[$]=tt?S.image[$].image:S.image[$],yt[$]=Pt(S,yt[$]);let Dt=yt[0],Nt=r.convert(S.format,S.colorSpace),Mt=r.convert(S.type),Zt=v(S.internalFormat,Nt,Mt,S.colorSpace),Xt=S.isVideoTexture!==
!0,ae=Y.__version===void 0||q===!0,L=Q.dataReady,ut=P(S,Dt);kt(s.TEXTURE_CUBE_MAP,S);let W;if(Yt){Xt&&ae&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ut,Zt,Dt.width,Dt.height);for(let $=0;$<6;$++){W=yt[$].mipmaps;for(let pt=0;pt<W.length;pt++){let ft=W[pt];S.format!==ze?Nt!==null?Xt?L&&e.compressedTexSubImage2D(
s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt,0,0,ft.width,ft.height,Nt,ft.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt,Zt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+
$,pt,0,0,ft.width,ft.height,Nt,Mt,ft.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt,Zt,ft.width,ft.height,0,Nt,Mt,ft.data)}}}else{if(W=S.mipmaps,Xt&&ae){W.length>0&&ut++;let $=_t(yt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ut,Zt,$.width,$.height)}for(let $=0;$<6;$++)if(tt){Xt?L&&e.texSubImage2D(
s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,yt[$].width,yt[$].height,Nt,Mt,yt[$].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Zt,yt[$].width,yt[$].height,0,Nt,Mt,yt[$].data);for(let pt=0;pt<W.length;pt++){let Ht=W[pt].image[$].image;Xt?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt+1,0,0,Ht.
width,Ht.height,Nt,Mt,Ht.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt+1,Zt,Ht.width,Ht.height,0,Nt,Mt,Ht.data)}}else{Xt?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Nt,Mt,yt[$]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Zt,Nt,Mt,yt[$]);for(let pt=0;pt<W.length;pt++){let ft=W[pt];
Xt?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt+1,0,0,Nt,Mt,ft.image[$]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt+1,Zt,Nt,Mt,ft.image[$])}}}g(S)&&p(s.TEXTURE_CUBE_MAP),Y.__version=Q.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function bt(w,S,F,q,Q,Y){let Et=r.convert(F.format,
F.colorSpace),ht=r.convert(F.type),xt=v(F.internalFormat,Et,ht,F.colorSpace),Yt=n.get(S),tt=n.get(F);if(tt.__renderTarget=S,!Yt.__hasExternalTextures){let yt=Math.max(1,S.width>>Y),Dt=Math.max(1,S.height>>Y);Q===s.TEXTURE_3D||Q===s.TEXTURE_2D_ARRAY?e.texImage3D(Q,Y,xt,yt,Dt,S.depth,0,Et,ht,null):e.texImage2D(
Q,Y,xt,yt,Dt,0,Et,ht,null)}e.bindFramebuffer(s.FRAMEBUFFER,w),vt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,q,Q,tt.__webglTexture,0,j(S)):(Q===s.TEXTURE_2D||Q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,q,Q,tt.__webglTexture,Y),e.
bindFramebuffer(s.FRAMEBUFFER,null)}function rt(w,S,F){if(s.bindRenderbuffer(s.RENDERBUFFER,w),S.depthBuffer){let q=S.depthTexture,Q=q&&q.isDepthTexture?q.type:null,Y=x(S.stencilBuffer,Q),Et=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=j(S);vt(S)?o.renderbufferStorageMultisampleEXT(
s.RENDERBUFFER,ht,Y,S.width,S.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,ht,Y,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Y,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Et,s.RENDERBUFFER,w)}else{let q=S.textures;for(let Q=0;Q<q.length;Q++){let Y=q[Q],Et=r.convert(
Y.format,Y.colorSpace),ht=r.convert(Y.type),xt=v(Y.internalFormat,Et,ht,Y.colorSpace),Yt=j(S);F&&vt(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Yt,xt,S.width,S.height):vt(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Yt,xt,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,xt,
S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function It(w,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,w),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.\
depthTexture must be an instance of THREE.DepthTexture");let q=n.get(S.depthTexture);q.__renderTarget=S,(!q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=
!0),J(S.depthTexture,0);let Q=q.__webglTexture,Y=j(S);if(S.depthTexture.format===Ni)vt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0);else if(S.depthTexture.format===zi)vt(S)?o.framebufferTexture2DMultisampleEXT(
s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ot(w){let S=n.get(w),F=w.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==w.depthTexture){
let q=w.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),q){let Q=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),S.__depthDisposeCallback=Q}S.__boundDepthTexture=q}if(w.depthTexture&&!S.__autoAllocateDepthBuffer){
if(F)throw new Error("target.depthTexture not supported in Cube render targets");It(S.__webglFramebuffer,w)}else if(F){S.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[q]),S.__webglDepthbuffer[q]===void 0)S.__webglDepthbuffer[q]=s.createRenderbuffer(),
rt(S.__webglDepthbuffer[q],w,!1);else{let Q=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer[q];s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,Y)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===
void 0)S.__webglDepthbuffer=s.createRenderbuffer(),rt(S.__webglDepthbuffer,w,!1);else{let q=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,q,s.RENDERBUFFER,Q)}e.bindFramebuffer(s.FRAMEBUFFER,
null)}function Lt(w,S,F){let q=n.get(w);S!==void 0&&bt(q.__webglFramebuffer,w,w.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&Ot(w)}function Jt(w){let S=w.texture,F=n.get(w),q=n.get(S);w.addEventListener("dispose",C);let Q=w.textures,Y=w.isWebGLCubeRenderTarget===!0,Et=Q.length>1;if(Et||(q.
__webglTexture===void 0&&(q.__webglTexture=s.createTexture()),q.__version=S.version,a.memory.textures++),Y){F.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer[ht]=[];for(let xt=0;xt<S.mipmaps.length;xt++)F.__webglFramebuffer[ht][xt]=s.createFramebuffer()}else
F.__webglFramebuffer[ht]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer=[];for(let ht=0;ht<S.mipmaps.length;ht++)F.__webglFramebuffer[ht]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(Et)for(let ht=0,xt=Q.length;ht<xt;ht++){let Yt=n.get(Q[ht]);
Yt.__webglTexture===void 0&&(Yt.__webglTexture=s.createTexture(),a.memory.textures++)}if(w.samples>0&&vt(w)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ht=0;ht<Q.length;ht++){let xt=Q[ht];
F.__webglColorRenderbuffer[ht]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[ht]);let Yt=r.convert(xt.format,xt.colorSpace),tt=r.convert(xt.type),yt=v(xt.internalFormat,Yt,tt,xt.colorSpace,w.isXRRenderTarget===!0),Dt=j(w);s.renderbufferStorageMultisample(s.RENDERBUFFER,
Dt,yt,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ht,s.RENDERBUFFER,F.__webglColorRenderbuffer[ht])}s.bindRenderbuffer(s.RENDERBUFFER,null),w.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),rt(F.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(s.FRAMEBUFFER,
null)}}if(Y){e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),kt(s.TEXTURE_CUBE_MAP,S);for(let ht=0;ht<6;ht++)if(S.mipmaps&&S.mipmaps.length>0)for(let xt=0;xt<S.mipmaps.length;xt++)bt(F.__webglFramebuffer[ht][xt],w,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,xt);else bt(F.__webglFramebuffer[ht],
w,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);g(S)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let ht=0,xt=Q.length;ht<xt;ht++){let Yt=Q[ht],tt=n.get(Yt);e.bindTexture(s.TEXTURE_2D,tt.__webglTexture),kt(s.TEXTURE_2D,Yt),bt(F.__webglFramebuffer,w,Yt,s.COLOR_ATTACHMENT0+ht,s.
TEXTURE_2D,0),g(Yt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let ht=s.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ht=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,q.__webglTexture),kt(ht,S),S.mipmaps&&S.mipmaps.length>0)for(let xt=0;xt<S.mipmaps.length;xt++)
bt(F.__webglFramebuffer[xt],w,S,s.COLOR_ATTACHMENT0,ht,xt);else bt(F.__webglFramebuffer,w,S,s.COLOR_ATTACHMENT0,ht,0);g(S)&&p(ht),e.unbindTexture()}w.depthBuffer&&Ot(w)}function K(w){let S=w.textures;for(let F=0,q=S.length;F<q;F++){let Q=S[F];if(g(Q)){let Y=y(w),Et=n.get(Q).__webglTexture;e.bindTexture(
Y,Et),p(Y),e.unbindTexture()}}}let nt=[],I=[];function Ct(w){if(w.samples>0){if(vt(w)===!1){let S=w.textures,F=w.width,q=w.height,Q=s.COLOR_BUFFER_BIT,Y=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Et=n.get(w),ht=S.length>1;if(ht)for(let xt=0;xt<S.length;xt++)e.bindFramebuffer(s.FRAMEBUFFER,
Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Et.
__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let xt=0;xt<S.length;xt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=s.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=s.STENCIL_BUFFER_BIT)),ht){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,
s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Et.__webglColorRenderbuffer[xt]);let Yt=n.get(S[xt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Yt,0)}s.blitFramebuffer(0,0,F,q,0,0,F,q,Q,s.NEAREST),l===!0&&(nt.length=0,I.length=0,nt.push(s.COLOR_ATTACHMENT0+xt),w.depthBuffer&&
w.resolveDepthBuffer===!1&&(nt.push(Y),I.push(Y),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,I)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,nt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ht)for(let xt=0;xt<S.length;xt++){e.bindFramebuffer(s.FRAMEBUFFER,Et.
__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,Et.__webglColorRenderbuffer[xt]);let Yt=n.get(S[xt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.
TEXTURE_2D,Yt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let S=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function j(w){return Math.min(i.maxSamples,
w.samples)}function vt(w){let S=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function at(w){let S=a.render.frame;h.get(w)!==S&&(h.set(w,S),w.update())}function Pt(w,S){let F=w.colorSpace,q=w.format,Q=w.type;return w.isCompressedTexture===
!0||w.isVideoTexture===!0||F!==Qi&&F!==Fn&&(qt.getTransfer(F)===jt?(q!==ze||Q!==Tn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),S}function _t(w){return typeof HTMLImageElement<
"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=k,this.setTexture2D=
J,this.setTexture2DArray=H,this.setTexture3D=et,this.setTextureCube=G,this.rebindTextures=Lt,this.setupRenderTarget=Jt,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=vt}function Rp(s,t){function e(n,i=Fn){
let r,a=qt.getTransfer(i);if(n===Tn)return s.UNSIGNED_BYTE;if(n===$l)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Kl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Au)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Tu)return s.BYTE;if(n===wu)return s.SHORT;if(n===Es)return s.UNSIGNED_SHORT;if(n===Jl)return s.INT;if(n===
Xn)return s.UNSIGNED_INT;if(n===Xe)return s.FLOAT;if(n===ln)return s.HALF_FLOAT;if(n===Cu)return s.ALPHA;if(n===Ru)return s.RGB;if(n===ze)return s.RGBA;if(n===Iu)return s.LUMINANCE;if(n===Pu)return s.LUMINANCE_ALPHA;if(n===Ni)return s.DEPTH_COMPONENT;if(n===zi)return s.DEPTH_STENCIL;if(n===Ql)return s.
RED;if(n===Qr)return s.RED_INTEGER;if(n===Du)return s.RG;if(n===jl)return s.RG_INTEGER;if(n===tc)return s.RGBA_INTEGER;if(n===sr||n===rr||n===ar||n===or)if(a===jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
if(n===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ar)return r.
COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===or)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===so||n===ro||n===ao||n===oo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===so)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ro)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ao)return r.
COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===oo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===lo||n===co||n===ho)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===lo||n===co)return a===jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ho)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:
r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===uo||n===fo||n===po||n===mo||n===go||n===_o||n===xo||n===vo||n===yo||n===Mo||n===So||n===bo||n===Eo||n===To)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===uo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;
if(n===fo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===po)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===mo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===go)return a===
jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_o)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===xo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===vo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:
r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===yo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Mo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===So)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;
if(n===bo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Eo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===To)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;
if(n===lr||n===wo||n===Ao)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===lr)return a===jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ao)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;
if(n===Lu||n===Co||n===Ro||n===Io)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===lr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Co)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ro)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Io)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;
return n===Bi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var Fo=class extends ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ai=class extends te{constructor(){super(),this.isGroup=!0,this.type="Group"}},kv={type:"move"},hr=class{constructor(){this._targetRay=null,
this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ai,this._targetRay.
matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ai,this._grip.matrixAutoUpdate=
!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this.
_hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this.
_targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let g=e.
getJointPose(_,n),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.
position),d=.02,m=.005;c.inputState.pinching&&f>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&
t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=
!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=
!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(kv)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),
this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ai;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Vv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,xh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let i=new xe,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.
texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new ge({vertexShader:Vv,fragmentShader:Hv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new he(new Is(20,20),n)}return this.mesh}reset(){this.texture=
null,this.mesh=null}getDepthTexture(){return this.texture}},vh=class extends rn{constructor(t,e){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,m=null,_=new xh,g=e.getContextAttributes(),p=null,y=null,v=[],x=[],P=new X,T=null,C=new ve;C.viewport=new $t;let R=new ve;
R.viewport=new $t;let b=[C,R],M=new Fo,D=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let it=v[Z];return it===void 0&&(it=new hr,v[Z]=it),it.getTargetRaySpace()},this.getControllerGrip=function(Z){let it=v[Z];return it===void 0&&(it=new hr,
v[Z]=it),it.getGripSpace()},this.getHand=function(Z){let it=v[Z];return it===void 0&&(it=new hr,v[Z]=it),it.getHandSpace()};function O(Z){let it=x.indexOf(Z.inputSource);if(it===-1)return;let bt=v[it];bt!==void 0&&(bt.update(Z.inputSource,Z.frame,c||a),bt.dispatchEvent({type:Z.type,data:Z.inputSource}))}
function V(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",V),i.removeEventListener("inputsourc\
eschange",J);for(let Z=0;Z<v.length;Z++){let it=x[Z];it!==null&&(x[Z]=null,v[Z].disconnect(it))}D=null,k=null,_.reset(),t.setRenderTarget(p),d=null,f=null,u=null,i=null,y=null,ee.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=
function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=
function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=t.getRenderTarget(),i.
addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",V),i.addEventListener("inputsourceschange",J),g.xrCompatible!==!0&&await e.
makeXRCompatible(),T=t.getPixelRatio(),t.getSize(P),i.renderState.layers===void 0){let it={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,it),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,
!1),y=new Me(d.framebufferWidth,d.framebufferHeight,{format:ze,type:Tn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let it=null,bt=null,rt=null;g.depth&&(rt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=g.stencil?zi:Ni,bt=g.stencil?Bi:Xn);let It={colorFormat:e.RGBA8,depthFormat:rt,
scaleFactor:r};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(It),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new Me(f.textureWidth,f.textureHeight,{format:ze,type:Tn,depthTexture:new Ar(f.textureWidth,f.textureHeight,bt,void 0,void 0,void 0,
void 0,void 0,void 0,it),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ee.setContext(i),ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"\
sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function J(Z){for(let it=0;it<Z.removed.length;it++){let bt=Z.removed[it],rt=x.indexOf(bt);rt>=0&&(x[rt]=null,v[rt].disconnect(bt))}for(let it=0;it<
Z.added.length;it++){let bt=Z.added[it],rt=x.indexOf(bt);if(rt===-1){for(let Ot=0;Ot<v.length;Ot++)if(Ot>=x.length){x.push(bt),rt=Ot;break}else if(x[Ot]===null){x[Ot]=bt,rt=Ot;break}if(rt===-1)break}let It=v[rt];It&&It.connect(bt)}}let H=new A,et=new A;function G(Z,it,bt){H.setFromMatrixPosition(it.
matrixWorld),et.setFromMatrixPosition(bt.matrixWorld);let rt=H.distanceTo(et),It=it.projectionMatrix.elements,Ot=bt.projectionMatrix.elements,Lt=It[14]/(It[10]-1),Jt=It[14]/(It[10]+1),K=(It[9]+1)/It[5],nt=(It[9]-1)/It[5],I=(It[8]-1)/It[0],Ct=(Ot[8]+1)/Ot[0],j=Lt*I,vt=Lt*Ct,at=rt/(-I+Ct),Pt=at*-I;if(it.
matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Pt),Z.translateZ(at),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),It[10]===-1)Z.projectionMatrix.copy(it.projectionMatrix),Z.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{
let _t=Lt+at,w=Jt+at,S=j-Pt,F=vt+(rt-Pt),q=K*Jt/w*_t,Q=nt*Jt/w*_t;Z.projectionMatrix.makePerspective(S,F,q,Q,_t,w),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function lt(Z,it){it===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(it.matrixWorld,Z.matrix),Z.matrixWorldInverse.
copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let it=Z.near,bt=Z.far;_.texture!==null&&(_.depthNear>0&&(it=_.depthNear),_.depthFar>0&&(bt=_.depthFar)),M.near=R.near=C.near=it,M.far=R.far=C.far=bt,(D!==M.near||k!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.
far}),D=M.near,k=M.far),C.layers.mask=Z.layers.mask|2,R.layers.mask=Z.layers.mask|4,M.layers.mask=C.layers.mask|R.layers.mask;let rt=Z.parent,It=M.cameras;lt(M,rt);for(let Ot=0;Ot<It.length;Ot++)lt(It[Ot],rt);It.length===2?G(M,C,R):M.projectionMatrix.copy(C.projectionMatrix),mt(Z,M,rt)};function mt(Z,it,bt){
bt===null?Z.matrix.copy(it.matrixWorld):(Z.matrix.copy(bt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(it.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(it.projectionMatrix),Z.projectionMatrixInverse.copy(it.projectionMatrixInverse),
Z.isPerspectiveCamera&&(Z.fov=Ts*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=
Z)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let St=null;function kt(Z,it){if(h=it.getViewerPose(c||a),m=it,h!==null){let bt=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let rt=!1;bt.length!==
M.cameras.length&&(M.cameras.length=0,rt=!0);for(let Ot=0;Ot<bt.length;Ot++){let Lt=bt[Ot],Jt=null;if(d!==null)Jt=d.getViewport(Lt);else{let nt=u.getViewSubImage(f,Lt);Jt=nt.viewport,Ot===0&&(t.setRenderTargetTextures(y,nt.colorTexture,f.ignoreDepthValues?void 0:nt.depthStencilTexture),t.setRenderTarget(
y))}let K=b[Ot];K===void 0&&(K=new ve,K.layers.enable(Ot),K.viewport=new $t,b[Ot]=K),K.matrix.fromArray(Lt.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(Lt.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(
Jt.x,Jt.y,Jt.width,Jt.height),Ot===0&&(M.matrix.copy(K.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),rt===!0&&M.cameras.push(K)}let It=i.enabledFeatures;if(It&&It.includes("depth-sensing")){let Ot=u.getDepthInformation(bt[0]);Ot&&Ot.isValid&&Ot.texture&&_.init(t,Ot,i.renderState)}}for(let bt=0;bt<
v.length;bt++){let rt=x[bt],It=v[bt];rt!==null&&It!==void 0&&It.update(rt,it,c||a)}St&&St(Z,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),m=null}let ee=new Ep;ee.setAnimationLoop(kt),this.setAnimationLoop=function(Z){St=Z},this.dispose=function(){}}},yi=new $e,Gv=new Ut;function Wv(s,t){
function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,bp(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,y,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?
r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?
(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,y,v):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.
emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,
p.side===ke&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===ke&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),
g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.
value=p.alphaTest);let y=t.get(p),v=y.envMap,x=y.envMapRotation;v&&(g.envMap.value=v,yi.copy(x),yi.x*=-1,yi.y*=-1,yi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),g.envMapRotation.value.setFromMatrix4(Gv.makeRotationFromEuler(yi)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===
!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(
p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,v){g.diffuse.value.copy(p.color),
g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=v*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=
p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,
1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(
p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,
e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.
clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),
g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ke&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],
g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),
p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&
(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),
p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),
p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let y=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.
value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Xv(s,t,e,n){let i={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){let x=v.program;n.uniformBlockBinding(y,x)}function c(y,v){let x=i[y.id];x===
void 0&&(m(y),x=h(y),i[y.id]=x,y.addEventListener("dispose",g));let P=v.program;n.updateUBOMapping(y,P);let T=t.render.frame;r[y.id]!==T&&(f(y),r[y.id]=T)}function h(y){let v=u();y.__bindingPointIndex=v;let x=s.createBuffer(),P=y.__size,T=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(
s.UNIFORM_BUFFER,P,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,x),x}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let v=i[y.
id],x=y.uniforms,P=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let T=0,C=x.length;T<C;T++){let R=Array.isArray(x[T])?x[T]:[x[T]];for(let b=0,M=R.length;b<M;b++){let D=R[b];if(d(D,T,b,P)===!0){let k=D.__offset,O=Array.isArray(D.value)?D.value:[D.value],V=0;for(let J=0;J<O.length;J++){let H=O[J],et=_(
H);typeof H=="number"||typeof H=="boolean"?(D.__data[0]=H,s.bufferSubData(s.UNIFORM_BUFFER,k+V,D.__data)):H.isMatrix3?(D.__data[0]=H.elements[0],D.__data[1]=H.elements[1],D.__data[2]=H.elements[2],D.__data[3]=0,D.__data[4]=H.elements[3],D.__data[5]=H.elements[4],D.__data[6]=H.elements[5],D.__data[7]=
0,D.__data[8]=H.elements[6],D.__data[9]=H.elements[7],D.__data[10]=H.elements[8],D.__data[11]=0):(H.toArray(D.__data,V),V+=et.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(y,v,x,P){let T=y.value,C=v+"_"+x;if(P[C]===
void 0)return typeof T=="number"||typeof T=="boolean"?P[C]=T:P[C]=T.clone(),!0;{let R=P[C];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return P[C]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function m(y){let v=y.uniforms,x=0,P=16;for(let C=0,R=v.length;C<R;C++){let b=Array.isArray(
v[C])?v[C]:[v[C]];for(let M=0,D=b.length;M<D;M++){let k=b[M],O=Array.isArray(k.value)?k.value:[k.value];for(let V=0,J=O.length;V<J;V++){let H=O[V],et=_(H),G=x%P,lt=G%et.boundary,mt=G+lt;x+=lt,mt!==0&&P-mt<et.storage&&(x+=P-mt),k.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=
x,x+=et.storage}}}let T=x%P;return T>0&&(x+=P-T),y.__size=x,y.__cache={},this}function _(y){let v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.
boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function g(y){let v=y.
target;v.removeEventListener("dispose",g);let x=a.indexOf(v.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function p(){for(let y in i)s.deleteBuffer(i[y]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}var yh=class{constructor(t={}){let{canvas:e=Mp(),context:n=null,
depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)
throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;let m=new Uint32Array(4),_=new Int32Array(4),g=null,p=null,y=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,
this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=We,this.toneMapping=kn,this.toneMappingExposure=1;let x=this,P=!1,T=0,C=0,R=null,b=-1,M=null,D=new $t,k=new $t,O=null,V=new ot(0),J=0,H=e.width,et=e.height,G=1,
lt=null,mt=null,St=new $t(0,0,H,et),kt=new $t(0,0,H,et),ee=!1,Z=new Hi,it=!1,bt=!1,rt=new Ut,It=new Ut,Ot=new A,Lt=new $t,Jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},K=!1;function nt(){return R===null?G:1}let I=n;function Ct(E,U){return e.getContext(E,U)}try{let E={
alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Vl}`),e.addEventListener("webglcontextlost",$,!1),e.addEventListener("webglcontextrestored",pt,!1),e.
addEventListener("webglcontextcreationerror",ft,!1),I===null){let U="webgl2";if(I=Ct(U,E),I===null)throw Ct(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let j,
vt,at,Pt,_t,w,S,F,q,Q,Y,Et,ht,xt,Yt,tt,yt,Dt,Nt,Mt,Zt,Xt,ae,L;function ut(){j=new sx(I),j.init(),Xt=new Rp(I,j),vt=new Q0(I,j,t,Xt),at=new Lv(I,j),vt.reverseDepthBuffer&&f&&at.buffers.depth.setReversed(!0),Pt=new ox(I),_t=new yv,w=new zv(I,j,at,_t,vt,Xt,Pt),S=new tx(x),F=new ix(x),q=new pg(I),ae=new $0(
I,q),Q=new rx(I,q,Pt,ae),Y=new cx(I,Q,q,Pt),Nt=new lx(I,vt,w),tt=new j0(_t),Et=new vv(x,S,F,j,vt,ae,tt),ht=new Wv(x,_t),xt=new Sv,Yt=new Cv(j),Dt=new J0(x,S,F,at,Y,d,l),yt=new Pv(x,Y,vt),L=new Xv(I,Pt,vt,at),Mt=new K0(I,j,Pt),Zt=new ax(I,j,Pt),Pt.programs=Et.programs,x.capabilities=vt,x.extensions=j,
x.properties=_t,x.renderLists=xt,x.shadowMap=yt,x.state=at,x.info=Pt}ut();let W=new vh(x,I);this.xr=W,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let E=j.get("WEBGL_lose_context");E&&E.loseContext()},this.
forceContextRestore=function(){let E=j.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(E){E!==void 0&&(G=E,this.setSize(H,et,!1))},this.getSize=function(E){return E.set(H,et)},this.setSize=function(E,U,B=!0){if(W.isPresenting){console.
warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=E,et=U,e.width=Math.floor(E*G),e.height=Math.floor(U*G),B===!0&&(e.style.width=E+"px",e.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(H*G,et*G).floor()},this.setDrawingBufferSize=
function(E,U,B){H=E,et=U,G=B,e.width=Math.floor(E*B),e.height=Math.floor(U*B),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(D)},this.getViewport=function(E){return E.copy(St)},this.setViewport=function(E,U,B,z){E.isVector4?St.set(E.x,E.y,E.z,E.w):St.set(E,U,B,z),at.viewport(
D.copy(St).multiplyScalar(G).round())},this.getScissor=function(E){return E.copy(kt)},this.setScissor=function(E,U,B,z){E.isVector4?kt.set(E.x,E.y,E.z,E.w):kt.set(E,U,B,z),at.scissor(k.copy(kt).multiplyScalar(G).round())},this.getScissorTest=function(){return ee},this.setScissorTest=function(E){at.setScissorTest(
ee=E)},this.setOpaqueSort=function(E){lt=E},this.setTransparentSort=function(E){mt=E},this.getClearColor=function(E){return E.copy(Dt.getClearColor())},this.setClearColor=function(){Dt.setClearColor.apply(Dt,arguments)},this.getClearAlpha=function(){return Dt.getClearAlpha()},this.setClearAlpha=function(){
Dt.setClearAlpha.apply(Dt,arguments)},this.clear=function(E=!0,U=!0,B=!0){let z=0;if(E){let N=!1;if(R!==null){let st=R.texture.format;N=st===tc||st===jl||st===Qr}if(N){let st=R.texture.type,dt=st===Tn||st===Xn||st===Es||st===Bi||st===$l||st===Kl,Tt=Dt.getClearColor(),wt=Dt.getClearAlpha(),Bt=Tt.r,Gt=Tt.
g,At=Tt.b;dt?(m[0]=Bt,m[1]=Gt,m[2]=At,m[3]=wt,I.clearBufferuiv(I.COLOR,0,m)):(_[0]=Bt,_[1]=Gt,_[2]=At,_[3]=wt,I.clearBufferiv(I.COLOR,0,_))}else z|=I.COLOR_BUFFER_BIT}U&&(z|=I.DEPTH_BUFFER_BIT),B&&(z|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(z)},this.clearColor=function(){
this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",$,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),
xt.dispose(),Yt.dispose(),_t.dispose(),S.dispose(),F.dispose(),Y.dispose(),ae.dispose(),L.dispose(),Et.dispose(),W.dispose(),W.removeEventListener("sessionstart",Wu),W.removeEventListener("sessionend",Xu),pi.stop()};function $(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=
!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;let E=Pt.autoReset,U=yt.enabled,B=yt.autoUpdate,z=yt.needsUpdate,N=yt.type;ut(),Pt.autoReset=E,yt.enabled=U,yt.autoUpdate=B,yt.needsUpdate=z,yt.type=N}function ft(E){console.error("THREE.WebGLRenderer: A WebGL context could \
not be created. Reason: ",E.statusMessage)}function Ht(E){let U=E.target;U.removeEventListener("dispose",Ht),fe(U)}function fe(E){Ie(E),_t.remove(E)}function Ie(E){let U=_t.get(E).programs;U!==void 0&&(U.forEach(function(B){Et.releaseProgram(B)}),E.isShaderMaterial&&Et.releaseShaderCache(E))}this.renderBufferDirect=
function(E,U,B,z,N,st){U===null&&(U=Jt);let dt=N.isMesh&&N.matrixWorld.determinant()<0,Tt=Gp(E,U,B,z,N);at.setMaterial(z,dt);let wt=B.index,Bt=1;if(z.wireframe===!0){if(wt=Q.getWireframeAttribute(B),wt===void 0)return;Bt=2}let Gt=B.drawRange,At=B.attributes.position,Kt=Gt.start*Bt,oe=(Gt.start+Gt.count)*
Bt;st!==null&&(Kt=Math.max(Kt,st.start*Bt),oe=Math.min(oe,(st.start+st.count)*Bt)),wt!==null?(Kt=Math.max(Kt,0),oe=Math.min(oe,wt.count)):At!=null&&(Kt=Math.max(Kt,0),oe=Math.min(oe,At.count));let le=oe-Kt;if(le<0||le===1/0)return;ae.setup(N,z,Tt,B,wt);let Ve,ne=Mt;if(wt!==null&&(Ve=q.get(wt),ne=Zt,
ne.setIndex(Ve)),N.isMesh)z.wireframe===!0?(at.setLineWidth(z.wireframeLinewidth*nt()),ne.setMode(I.LINES)):ne.setMode(I.TRIANGLES);else if(N.isLine){let Rt=z.linewidth;Rt===void 0&&(Rt=1),at.setLineWidth(Rt*nt()),N.isLineSegments?ne.setMode(I.LINES):N.isLineLoop?ne.setMode(I.LINE_LOOP):ne.setMode(I.
LINE_STRIP)}else N.isPoints?ne.setMode(I.POINTS):N.isSprite&&ne.setMode(I.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ne.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(j.get("WEBGL_multi_draw"))ne.renderMultiDraw(N._multiDrawStarts,
N._multiDrawCounts,N._multiDrawCount);else{let Rt=N._multiDrawStarts,Rn=N._multiDrawCounts,ie=N._multiDrawCount,hn=wt?q.get(wt).bytesPerElement:1,ji=_t.get(z).currentProgram.getUniforms();for(let qe=0;qe<ie;qe++)ji.setValue(I,"_gl_DrawID",qe),ne.render(Rt[qe]/hn,Rn[qe])}else if(N.isInstancedMesh)ne.
renderInstances(Kt,le,N.count);else if(B.isInstancedBufferGeometry){let Rt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Rn=Math.min(B.instanceCount,Rt);ne.renderInstances(Kt,le,Rn)}else ne.render(Kt,le)};function se(E,U,B){E.transparent===!0&&E.side===yn&&E.forceSinglePass===!1?(E.side=ke,E.
needsUpdate=!0,na(E,U,B),E.side=Gn,E.needsUpdate=!0,na(E,U,B),E.side=yn):na(E,U,B)}this.compile=function(E,U,B=null){B===null&&(B=E),p=Yt.get(B),p.init(U),v.push(p),B.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),E!==B&&E.traverseVisible(
function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();let z=new Set;return E.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;let st=N.material;if(st)if(Array.isArray(st))for(let dt=0;dt<st.length;dt++){let Tt=st[dt];
se(Tt,B,N),z.add(Tt)}else se(st,B,N),z.add(st)}),v.pop(),p=null,z},this.compileAsync=function(E,U,B=null){let z=this.compile(E,U,B);return new Promise(N=>{function st(){if(z.forEach(function(dt){_t.get(dt).currentProgram.isReady()&&z.delete(dt)}),z.size===0){N(E);return}setTimeout(st,10)}j.get("KHR_\
parallel_shader_compile")!==null?st():setTimeout(st,10)})};let cn=null;function Cn(E){cn&&cn(E)}function Wu(){pi.stop()}function Xu(){pi.start()}let pi=new Ep;pi.setAnimationLoop(Cn),typeof self<"u"&&pi.setContext(self),this.setAnimationLoop=function(E){cn=E,W.setAnimationLoop(E),E===null?pi.stop():
pi.start()},W.addEventListener("sessionstart",Wu),W.addEventListener("sessionend",Xu),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),
U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(U),U=W.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,U,R),p=Yt.get(E,v.length),p.init(U),v.push(p),It.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),
Z.setFromProjectionMatrix(It),bt=this.localClippingEnabled,it=tt.init(this.clippingPlanes,bt),g=xt.get(E,y.length),g.init(),y.push(g),W.enabled===!0&&W.isPresenting===!0){let st=x.xr.getDepthSensingMesh();st!==null&&cc(st,U,-1/0,x.sortObjects)}cc(E,U,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.
sort(lt,mt),K=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,K&&Dt.addToRenderList(g,E),this.info.render.frame++,it===!0&&tt.beginShadows();let B=p.state.shadowsArray;yt.render(B,E,U),it===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();let z=g.opaque,N=g.transmissive;
if(p.setupLights(),U.isArrayCamera){let st=U.cameras;if(N.length>0)for(let dt=0,Tt=st.length;dt<Tt;dt++){let wt=st[dt];Yu(z,N,E,wt)}K&&Dt.render(E);for(let dt=0,Tt=st.length;dt<Tt;dt++){let wt=st[dt];qu(g,E,wt,wt.viewport)}}else N.length>0&&Yu(z,N,E,U),K&&Dt.render(E),qu(g,E,U);R!==null&&(w.updateMultisampleRenderTarget(
R),w.updateRenderTargetMipmap(R)),E.isScene===!0&&E.onAfterRender(x,E,U),ae.resetDefaultState(),b=-1,M=null,v.pop(),v.length>0?(p=v[v.length-1],it===!0&&tt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function cc(E,U,B,z){if(E.visible===!1)return;
if(E.layers.test(U.layers)){if(E.isGroup)B=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Z.intersectsSprite(E)){z&&Lt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(It);let dt=Y.
update(E),Tt=E.material;Tt.visible&&g.push(E,dt,Tt,B,Lt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Z.intersectsObject(E))){let dt=Y.update(E),Tt=E.material;if(z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Lt.copy(E.boundingSphere.center)):
(dt.boundingSphere===null&&dt.computeBoundingSphere(),Lt.copy(dt.boundingSphere.center)),Lt.applyMatrix4(E.matrixWorld).applyMatrix4(It)),Array.isArray(Tt)){let wt=dt.groups;for(let Bt=0,Gt=wt.length;Bt<Gt;Bt++){let At=wt[Bt],Kt=Tt[At.materialIndex];Kt&&Kt.visible&&g.push(E,dt,Kt,B,Lt.z,At)}}else Tt.
visible&&g.push(E,dt,Tt,B,Lt.z,null)}}let st=E.children;for(let dt=0,Tt=st.length;dt<Tt;dt++)cc(st[dt],U,B,z)}function qu(E,U,B,z){let N=E.opaque,st=E.transmissive,dt=E.transparent;p.setupLightsView(B),it===!0&&tt.setGlobalState(x.clippingPlanes,B),z&&at.viewport(D.copy(z)),N.length>0&&ea(N,U,B),st.
length>0&&ea(st,U,B),dt.length>0&&ea(dt,U,B),at.buffers.depth.setTest(!0),at.buffers.depth.setMask(!0),at.buffers.color.setMask(!0),at.setPolygonOffset(!1)}function Yu(E,U,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.
id]=new Me(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")||j.has("EXT_color_buffer_float")?ln:Tn,minFilter:Sn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));let st=p.state.transmissionRenderTarget[z.id],dt=z.viewport||D;st.
setSize(dt.z,dt.w);let Tt=x.getRenderTarget();x.setRenderTarget(st),x.getClearColor(V),J=x.getClearAlpha(),J<1&&x.setClearColor(16777215,.5),x.clear(),K&&Dt.render(B);let wt=x.toneMapping;x.toneMapping=kn;let Bt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),it===!0&&tt.
setGlobalState(x.clippingPlanes,z),ea(E,B,z),w.updateMultisampleRenderTarget(st),w.updateRenderTargetMipmap(st),j.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let At=0,Kt=U.length;At<Kt;At++){let oe=U[At],le=oe.object,Ve=oe.geometry,ne=oe.material,Rt=oe.group;if(ne.side===yn&&le.layers.
test(z.layers)){let Rn=ne.side;ne.side=ke,ne.needsUpdate=!0,Zu(le,B,z,Ve,ne,Rt),ne.side=Rn,ne.needsUpdate=!0,Gt=!0}}Gt===!0&&(w.updateMultisampleRenderTarget(st),w.updateRenderTargetMipmap(st))}x.setRenderTarget(Tt),x.setClearColor(V,J),Bt!==void 0&&(z.viewport=Bt),x.toneMapping=wt}function ea(E,U,B){
let z=U.isScene===!0?U.overrideMaterial:null;for(let N=0,st=E.length;N<st;N++){let dt=E[N],Tt=dt.object,wt=dt.geometry,Bt=z===null?dt.material:z,Gt=dt.group;Tt.layers.test(B.layers)&&Zu(Tt,U,B,wt,Bt,Gt)}}function Zu(E,U,B,z,N,st){E.onBeforeRender(x,U,B,z,N,st),E.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,
E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),N.onBeforeRender(x,U,B,z,E,st),N.transparent===!0&&N.side===yn&&N.forceSinglePass===!1?(N.side=ke,N.needsUpdate=!0,x.renderBufferDirect(B,U,z,N,E,st),N.side=Gn,N.needsUpdate=!0,x.renderBufferDirect(B,U,z,N,E,st),N.side=yn):x.renderBufferDirect(
B,U,z,N,E,st),E.onAfterRender(x,U,B,z,N,st)}function na(E,U,B){U.isScene!==!0&&(U=Jt);let z=_t.get(E),N=p.state.lights,st=p.state.shadowsArray,dt=N.state.version,Tt=Et.getParameters(E,N.state,st,U,B),wt=Et.getProgramCacheKey(Tt),Bt=z.programs;z.environment=E.isMeshStandardMaterial?U.environment:null,
z.fog=U.fog,z.envMap=(E.isMeshStandardMaterial?F:S).get(E.envMap||z.environment),z.envMapRotation=z.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Bt===void 0&&(E.addEventListener("dispose",Ht),Bt=new Map,z.programs=Bt);let Gt=Bt.get(wt);if(Gt!==void 0){if(z.currentProgram===
Gt&&z.lightsStateVersion===dt)return $u(E,Tt),Gt}else Tt.uniforms=Et.getUniforms(E),E.onBeforeCompile(Tt,x),Gt=Et.acquireProgram(Tt,wt),Bt.set(wt,Gt),z.uniforms=Tt.uniforms;let At=z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(At.clippingPlanes=tt.uniform),$u(E,Tt),
z.needsLights=Xp(E),z.lightsStateVersion=dt,z.needsLights&&(At.ambientLightColor.value=N.state.ambient,At.lightProbe.value=N.state.probe,At.directionalLights.value=N.state.directional,At.directionalLightShadows.value=N.state.directionalShadow,At.spotLights.value=N.state.spot,At.spotLightShadows.value=
N.state.spotShadow,At.rectAreaLights.value=N.state.rectArea,At.ltc_1.value=N.state.rectAreaLTC1,At.ltc_2.value=N.state.rectAreaLTC2,At.pointLights.value=N.state.point,At.pointLightShadows.value=N.state.pointShadow,At.hemisphereLights.value=N.state.hemi,At.directionalShadowMap.value=N.state.directionalShadowMap,
At.directionalShadowMatrix.value=N.state.directionalShadowMatrix,At.spotShadowMap.value=N.state.spotShadowMap,At.spotLightMatrix.value=N.state.spotLightMatrix,At.spotLightMap.value=N.state.spotLightMap,At.pointShadowMap.value=N.state.pointShadowMap,At.pointShadowMatrix.value=N.state.pointShadowMatrix),
z.currentProgram=Gt,z.uniformsList=null,Gt}function Ju(E){if(E.uniformsList===null){let U=E.currentProgram.getUniforms();E.uniformsList=bs.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function $u(E,U){let B=_t.get(E);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=
U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,
B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function Gp(E,U,B,z,N){U.isScene!==!0&&(U=Jt),w.resetTextureUnits();let st=U.fog,dt=z.isMeshStandardMaterial?U.environment:null,Tt=R===null?x.outputColorSpace:R.isXRRenderTarget===
!0?R.texture.colorSpace:Qi,wt=(z.isMeshStandardMaterial?F:S).get(z.envMap||dt),Bt=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Gt=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),At=!!B.morphAttributes.position,Kt=!!B.morphAttributes.normal,oe=!!B.morphAttributes.
color,le=kn;z.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(le=x.toneMapping);let Ve=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ne=Ve!==void 0?Ve.length:0,Rt=_t.get(z),Rn=p.state.lights;if(it===!0&&(bt===!0||E!==M)){let tn=E===M&&z.id===b;tt.setState(z,E,tn)}let ie=!1;
z.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==Rn.state.version||Rt.outputColorSpace!==Tt||N.isBatchedMesh&&Rt.batching===!1||!N.isBatchedMesh&&Rt.batching===!0||N.isBatchedMesh&&Rt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Rt.batchingColor===!1&&N.colorTexture!==
null||N.isInstancedMesh&&Rt.instancing===!1||!N.isInstancedMesh&&Rt.instancing===!0||N.isSkinnedMesh&&Rt.skinning===!1||!N.isSkinnedMesh&&Rt.skinning===!0||N.isInstancedMesh&&Rt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Rt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&
Rt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Rt.instancingMorph===!1&&N.morphTexture!==null||Rt.envMap!==wt||z.fog===!0&&Rt.fog!==st||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==tt.numPlanes||Rt.numIntersection!==tt.numIntersection)||Rt.vertexAlphas!==Bt||Rt.vertexTangents!==
Gt||Rt.morphTargets!==At||Rt.morphNormals!==Kt||Rt.morphColors!==oe||Rt.toneMapping!==le||Rt.morphTargetsCount!==ne)&&(ie=!0):(ie=!0,Rt.__version=z.version);let hn=Rt.currentProgram;ie===!0&&(hn=na(z,U,N));let ji=!1,qe=!1,ks=!1,ce=hn.getUniforms(),_n=Rt.uniforms;if(at.useProgram(hn.program)&&(ji=!0,
qe=!0,ks=!0),z.id!==b&&(b=z.id,qe=!0),ji||M!==E){at.buffers.depth.getReversed()?(rt.copy(E.projectionMatrix),Ym(rt),Zm(rt),ce.setValue(I,"projectionMatrix",rt)):ce.setValue(I,"projectionMatrix",E.projectionMatrix),ce.setValue(I,"viewMatrix",E.matrixWorldInverse);let $n=ce.map.cameraPosition;$n!==void 0&&
$n.setValue(I,Ot.setFromMatrixPosition(E.matrixWorld)),vt.logarithmicDepthBuffer&&ce.setValue(I,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ce.setValue(I,"\
isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,qe=!0,ks=!0)}if(N.isSkinnedMesh){ce.setOptional(I,N,"bindMatrix"),ce.setOptional(I,N,"bindMatrixInverse");let tn=N.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),ce.setValue(I,"boneTexture",tn.boneTexture,w))}N.isBatchedMesh&&(ce.
setOptional(I,N,"batchingTexture"),ce.setValue(I,"batchingTexture",N._matricesTexture,w),ce.setOptional(I,N,"batchingIdTexture"),ce.setValue(I,"batchingIdTexture",N._indirectTexture,w),ce.setOptional(I,N,"batchingColorTexture"),N._colorsTexture!==null&&ce.setValue(I,"batchingColorTexture",N._colorsTexture,
w));let Vs=B.morphAttributes;if((Vs.position!==void 0||Vs.normal!==void 0||Vs.color!==void 0)&&Nt.update(N,B,hn),(qe||Rt.receiveShadow!==N.receiveShadow)&&(Rt.receiveShadow=N.receiveShadow,ce.setValue(I,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(_n.envMap.value=wt,_n.
flipEnvMap.value=wt.isCubeTexture&&wt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(_n.envMapIntensity.value=U.environmentIntensity),qe&&(ce.setValue(I,"toneMappingExposure",x.toneMappingExposure),Rt.needsLights&&Wp(_n,ks),st&&z.fog===!0&&ht.refreshFogUniforms(
_n,st),ht.refreshMaterialUniforms(_n,z,G,et,p.state.transmissionRenderTarget[E.id]),bs.upload(I,Ju(Rt),_n,w)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(bs.upload(I,Ju(Rt),_n,w),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ce.setValue(I,"center",N.center),ce.setValue(I,"modelViewMatrix",N.modelViewMatrix),
ce.setValue(I,"normalMatrix",N.normalMatrix),ce.setValue(I,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let tn=z.uniformsGroups;for(let $n=0,Kn=tn.length;$n<Kn;$n++){let Ku=tn[$n];L.update(Ku,hn),L.bind(Ku,hn)}}return hn}function Wp(E,U){E.ambientLightColor.needsUpdate=U,E.
lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function Xp(E){
return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=
function(E,U,B){_t.get(E.texture).__webglTexture=U,_t.get(E.depthTexture).__webglTexture=B;let z=_t.get(E);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=B===void 0,z.__autoAllocateDepthBuffer||j.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-\
texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,U){let B=_t.get(E);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,B=0){R=E,T=U,C=B;let z=!0,N=null,st=!1,
dt=!1;if(E){let wt=_t.get(E);if(wt.__useDefaultFramebuffer!==void 0)at.bindFramebuffer(I.FRAMEBUFFER,null),z=!1;else if(wt.__webglFramebuffer===void 0)w.setupRenderTarget(E);else if(wt.__hasExternalTextures)w.rebindTextures(E,_t.get(E.texture).__webglTexture,_t.get(E.depthTexture).__webglTexture);else if(E.
depthBuffer){let At=E.depthTexture;if(wt.__boundDepthTexture!==At){if(At!==null&&_t.has(At)&&(E.width!==At.image.width||E.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(E)}}let Bt=E.texture;(Bt.isData3DTexture||
Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(dt=!0);let Gt=_t.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Gt[U])?N=Gt[U][B]:N=Gt[U],st=!0):E.samples>0&&w.useMultisampledRTT(E)===!1?N=_t.get(E).__webglMultisampledFramebuffer:Array.isArray(Gt)?N=Gt[B]:N=Gt,D.copy(E.viewport),
k.copy(E.scissor),O=E.scissorTest}else D.copy(St).multiplyScalar(G).floor(),k.copy(kt).multiplyScalar(G).floor(),O=ee;if(at.bindFramebuffer(I.FRAMEBUFFER,N)&&z&&at.drawBuffers(E,N),at.viewport(D),at.scissor(k),at.setScissorTest(O),st){let wt=_t.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,
I.TEXTURE_CUBE_MAP_POSITIVE_X+U,wt.__webglTexture,B)}else if(dt){let wt=_t.get(E.texture),Bt=U||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,wt.__webglTexture,B||0,Bt)}b=-1},this.readRenderTargetPixels=function(E,U,B,z,N,st,dt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.We\
bGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=_t.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&dt!==void 0&&(Tt=Tt[dt]),Tt){at.bindFramebuffer(I.FRAMEBUFFER,Tt);try{let wt=E.texture,Bt=wt.format,Gt=wt.type;if(!vt.textureFormatReadable(Bt)){
console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!vt.textureTypeReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}
U>=0&&U<=E.width-z&&B>=0&&B<=E.height-N&&I.readPixels(U,B,z,N,Xt.convert(Bt),Xt.convert(Gt),st)}finally{let wt=R!==null?_t.get(R).__webglFramebuffer:null;at.bindFramebuffer(I.FRAMEBUFFER,wt)}}},this.readRenderTargetPixelsAsync=async function(E,U,B,z,N,st,dt){if(!(E&&E.isWebGLRenderTarget))throw new Error(
"THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=_t.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&dt!==void 0&&(Tt=Tt[dt]),Tt){let wt=E.texture,Bt=wt.format,Gt=wt.type;if(!vt.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.re\
adRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!vt.textureTypeReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=E.width-z&&B>=0&&B<=E.height-
N){at.bindFramebuffer(I.FRAMEBUFFER,Tt);let At=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,At),I.bufferData(I.PIXEL_PACK_BUFFER,st.byteLength,I.STREAM_READ),I.readPixels(U,B,z,N,Xt.convert(Bt),Xt.convert(Gt),0);let Kt=R!==null?_t.get(R).__webglFramebuffer:null;at.bindFramebuffer(I.FRAMEBUFFER,
Kt);let oe=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await qm(I,oe,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,At),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,st),I.deleteBuffer(At),I.deleteSync(oe),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read boun\
ds are out of range.")}},this.copyFramebufferToTexture=function(E,U=null,B=0){E.isTexture!==!0&&(tr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,E=arguments[1]);let z=Math.pow(2,-B),N=Math.floor(E.image.width*z),st=Math.floor(E.image.height*z),dt=U!==
null?U.x:0,Tt=U!==null?U.y:0;w.setTexture2D(E,0),I.copyTexSubImage2D(I.TEXTURE_2D,B,0,0,dt,Tt,N,st),at.unbindTexture()},this.copyTextureToTexture=function(E,U,B=null,z=null,N=0){E.isTexture!==!0&&(tr("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,E=arguments[1],
U=arguments[2],N=arguments[3]||0,B=null);let st,dt,Tt,wt,Bt,Gt,At,Kt,oe,le=E.isCompressedTexture?E.mipmaps[N]:E.image;B!==null?(st=B.max.x-B.min.x,dt=B.max.y-B.min.y,Tt=B.isBox3?B.max.z-B.min.z:1,wt=B.min.x,Bt=B.min.y,Gt=B.isBox3?B.min.z:0):(st=le.width,dt=le.height,Tt=le.depth||1,wt=0,Bt=0,Gt=0),z!==
null?(At=z.x,Kt=z.y,oe=z.z):(At=0,Kt=0,oe=0);let Ve=Xt.convert(U.format),ne=Xt.convert(U.type),Rt;U.isData3DTexture?(w.setTexture3D(U,0),Rt=I.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(w.setTexture2DArray(U,0),Rt=I.TEXTURE_2D_ARRAY):(w.setTexture2D(U,0),Rt=I.TEXTURE_2D),I.pixelStorei(
I.UNPACK_FLIP_Y_WEBGL,U.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);let Rn=I.getParameter(I.UNPACK_ROW_LENGTH),ie=I.getParameter(I.UNPACK_IMAGE_HEIGHT),hn=I.getParameter(I.UNPACK_SKIP_PIXELS),ji=I.getParameter(I.UNPACK_SKIP_ROWS),
qe=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,le.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,le.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,wt),I.pixelStorei(I.UNPACK_SKIP_ROWS,Bt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Gt);let ks=E.isDataArrayTexture||E.isData3DTexture,ce=U.isDataArrayTexture||
U.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){let _n=_t.get(E),Vs=_t.get(U),tn=_t.get(_n.__renderTarget),$n=_t.get(Vs.__renderTarget);at.bindFramebuffer(I.READ_FRAMEBUFFER,tn.__webglFramebuffer),at.bindFramebuffer(I.DRAW_FRAMEBUFFER,$n.__webglFramebuffer);for(let Kn=0;Kn<Tt;Kn++)ks&&
I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,_t.get(E).__webglTexture,N,Gt+Kn),E.isDepthTexture?(ce&&I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,_t.get(U).__webglTexture,N,oe+Kn),I.blitFramebuffer(wt,Bt,st,dt,At,Kt,st,dt,I.DEPTH_BUFFER_BIT,I.NEAREST)):ce?I.copyTexSubImage3D(
Rt,N,At,Kt,oe+Kn,wt,Bt,st,dt):I.copyTexSubImage2D(Rt,N,At,Kt,oe+Kn,wt,Bt,st,dt);at.bindFramebuffer(I.READ_FRAMEBUFFER,null),at.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else ce?E.isDataTexture||E.isData3DTexture?I.texSubImage3D(Rt,N,At,Kt,oe,st,dt,Tt,Ve,ne,le.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(
Rt,N,At,Kt,oe,st,dt,Tt,Ve,le.data):I.texSubImage3D(Rt,N,At,Kt,oe,st,dt,Tt,Ve,ne,le):E.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,N,At,Kt,st,dt,Ve,ne,le.data):E.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,N,At,Kt,le.width,le.height,Ve,le.data):I.texSubImage2D(I.TEXTURE_2D,N,At,Kt,st,dt,
Ve,ne,le);I.pixelStorei(I.UNPACK_ROW_LENGTH,Rn),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ie),I.pixelStorei(I.UNPACK_SKIP_PIXELS,hn),I.pixelStorei(I.UNPACK_SKIP_ROWS,ji),I.pixelStorei(I.UNPACK_SKIP_IMAGES,qe),N===0&&U.generateMipmaps&&I.generateMipmap(Rt),at.unbindTexture()},this.copyTextureToTexture3D=function(E,U,B=null,z=null,N=0){
return E.isTexture!==!0&&(tr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,z=arguments[1]||null,E=arguments[2],U=arguments[3],N=arguments[4]||0),tr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),
this.copyTextureToTexture(E,U,B,z,N)},this.initRenderTarget=function(E){_t.get(E).__webglFramebuffer===void 0&&w.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?w.setTextureCube(E,0):E.isData3DTexture?w.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?w.setTexture2DArray(
E,0):w.setTexture2D(E,0),at.unbindTexture()},this.resetState=function(){T=0,C=0,R=null,at.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){
this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}},Oo=class s{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ot(t),this.density=e}clone(){return new s(this.color,this.density)}toJSON(){
return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},Bo=class s{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new ot(t),this.near=e,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.
getHex(),near:this.near,far:this.far}}},zo=class extends te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $e,this.environmentIntensity=1,this.environmentRotation=
new $e,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==
null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==
null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==
1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Gi=class{constructor(t,e){
this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=yr,this.updateRanges=[],this.version=0,this.uuid=Je()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,
count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){
return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Je()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(
t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Je()),t.arrayBuffers[this.
array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Fe=new A,hi=class s{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,
this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(
e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(
e,Fe.x,Fe.y,Fe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Be(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Vt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&
(e=Vt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Vt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Vt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){
return this.normalized&&(e=Vt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Be(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=
Be(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Be(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Be(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.
normalized&&(e=Vt(e,this.array),n=Vt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Vt(e,this.array),n=Vt(n,this.array),i=Vt(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=
i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Vt(e,this.array),n=Vt(n,this.array),i=Vt(i,this.array),r=Vt(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE\
.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Qt(new this.array.constructor(e),this.itemSize,
this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){
console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,
type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,
data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ir=class extends we{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.
fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ds,qs=new A,ps=new A,ms=new A,gs=new X,Ys=new X,Ip=new Ut,ba=new A,Zs=new A,Ea=new A,Gf=new X,Fc=new X,
Wf=new X,ko=class extends te{constructor(t=new Ir){if(super(),this.isSprite=!0,this.type="Sprite",ds===void 0){ds=new Ft;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Gi(e,5);ds.setIndex([0,1,2,0,2,3]),ds.setAttribute("position",new hi(n,3,0,!1)),ds.setAttribute(
"uv",new hi(n,2,3,!1))}this.geometry=ds,this.material=t,this.center=new X(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ps.setFromMatrixScale(this.matrixWorld),Ip.copy(t.camera.matrixWorld),this.modelViewMatrix.
multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ms.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ps.multiplyScalar(-ms.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;Ta(ba.set(-.5,
-.5,0),ms,a,ps,i,r),Ta(Zs.set(.5,-.5,0),ms,a,ps,i,r),Ta(Ea.set(.5,.5,0),ms,a,ps,i,r),Gf.set(0,0),Fc.set(1,0),Wf.set(1,1);let o=t.ray.intersectTriangle(ba,Zs,Ea,!1,qs);if(o===null&&(Ta(Zs.set(-.5,.5,0),ms,a,ps,i,r),Fc.set(0,1),o=t.ray.intersectTriangle(ba,Ea,Zs,!1,qs),o===null))return;let l=t.ray.origin.
distanceTo(qs);l<t.near||l>t.far||e.push({distance:l,point:qs.clone(),uv:Mn.getInterpolation(qs,ba,Zs,Ea,Gf,Fc,Wf,new X),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Ta(s,t,e,n,i,r){gs.subVectors(s,e).
addScalar(.5).multiply(n),i!==void 0?(Ys.x=r*gs.x-i*gs.y,Ys.y=i*gs.x+r*gs.y):Ys.copy(gs),s.copy(t),s.x+=Ys.x,s.y+=Ys.y,s.applyMatrix4(Ip)}var wa=new A,Xf=new A,Vo=class extends te{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},
isLOD:{value:!0}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);let e=t.levels;for(let n=0,i=e.length;n<i;n++){let r=e[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,n=0){e=Math.abs(e);let i=this.levels,r;for(r=0;r<i.length&&!(e<i[r].
distance);r++);return i.splice(r,0,{distance:e,hysteresis:n,object:t}),this.add(t),this}removeLevel(t){let e=this.levels;for(let n=0;n<e.length;n++)if(e[n].distance===t){let i=e.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){
let e=this.levels;if(e.length>0){let n,i;for(n=1,i=e.length;n<i;n++){let r=e[n].distance;if(e[n].object.visible&&(r-=r*e[n].hysteresis),t<r)break}return e[n-1].object}return null}raycast(t,e){if(this.levels.length>0){wa.setFromMatrixPosition(this.matrixWorld);let i=t.ray.origin.distanceTo(wa);this.getObjectForDistance(
i).raycast(t,e)}}update(t){let e=this.levels;if(e.length>1){wa.setFromMatrixPosition(t.matrixWorld),Xf.setFromMatrixPosition(this.matrixWorld);let n=wa.distanceTo(Xf)/t.zoom;e[0].object.visible=!0;let i,r;for(i=1,r=e.length;i<r;i++){let a=e[i].distance;if(e[i].object.visible&&(a-=a*e[i].hysteresis),
n>=a)e[i-1].object.visible=!1,e[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)e[i].object.visible=!1}}toJSON(t){let e=super.toJSON(t);this.autoUpdate===!1&&(e.object.autoUpdate=!1),e.object.levels=[];let n=this.levels;for(let i=0,r=n.length;i<r;i++){let a=n[i];e.object.levels.push(
{object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return e}},qf=new A,Yf=new $t,Zf=new $t,qv=new A,Jf=new Ut,Aa=new A,Oc=new Te,$f=new Ut,Bc=new li,Ho=class extends he{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=th,this.bindMatrix=new Ut,
this.bindMatrixInverse=new Ut,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ce),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Aa),this.boundingBox.
expandByPoint(Aa)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Te),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Aa),this.boundingSphere.expandByPoint(Aa)}copy(t,e){return super.
copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.
material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Oc.copy(this.boundingSphere),Oc.applyMatrix4(i),t.ray.intersectsSphere(Oc)!==!1&&($f.copy(i).invert(),Bc.copy(t.ray).applyMatrix4($f),!(this.boundingBox!==null&&Bc.intersectsBox(this.boundingBox)===!1)&&
this._computeIntersections(t,e,Bc)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).
invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new $t,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(
t),this.bindMode===th?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ip?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,i=this.geometry;Yf.fromBufferAttribute(
i.attributes.skinIndex,t),Zf.fromBufferAttribute(i.attributes.skinWeight,t),qf.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){let a=Zf.getComponent(r);if(a!==0){let o=Yf.getComponent(r);Jf.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(qv.copy(qf).
applyMatrix4(Jf),a)}}return e.applyMatrix4(this.bindMatrixInverse)}},Pr=class extends te{constructor(){super(),this.isBone=!0,this.type="Bone"}},sn=class extends xe{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Ae,h=Ae,u,f){super(null,a,o,l,c,h,i,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},
this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Kf=new Ut,Yv=new Ut,Go=class s{constructor(t=[],e=[]){this.uuid=Je(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(
t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ut)}}calculateInverses(){this.boneInverses.
length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new Ut;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<
e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;
for(let r=0,a=t.length;r<a;r++){let o=t[r]?t[r].matrixWorld:Yv;Kf.multiplyMatrices(o,e[r]),Kf.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(
t*t*4);e.set(this.boneMatrices);let n=new sn(e,t,t,ze,Xe);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=
null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){let r=t.bones[n],a=e[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Pr),this.bones.push(a),this.boneInverses.push(new Ut().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={
metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){let a=e[i];t.bones.push(a.uuid);let o=n[i];t.boneInverses.push(o.toArray())}return t}},qn=class extends Qt{constructor(t,e,n,i=1){
super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},_s=new Ut,Qf=new Ut,Ca=[],jf=new Ce,Zv=new Ut,
Js=new he,$s=new Te,Wo=class extends he{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new qn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Zv)}computeBoundingBox(){
let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ce),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,_s),jf.copy(t.boundingBox).applyMatrix4(_s),this.boundingBox.union(jf)}computeBoundingSphere(){let t=this.
geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Te),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,_s),$s.copy(t.boundingSphere).applyMatrix4(_s),this.boundingSphere.union($s)}copy(t,e){return super.
copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.
boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=
i[a+o]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(Js.geometry=this.geometry,Js.material=this.material,Js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$s.copy(this.boundingSphere),$s.applyMatrix4(n),t.ray.intersectsSphere($s)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(
r,_s),Qf.multiplyMatrices(n,_s),Js.matrixWorld=Qf,Js.raycast(t,Ca);for(let a=0,o=Ca.length;a<o;a++){let l=Ca[a];l.instanceId=r,l.object=this,e.push(l)}Ca.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new qn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(
this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new sn(new Float32Array(i*this.count),i,this.count,Ql,Xe));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<
n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};function zc(s,t){return s-t}function Jv(s,t){
return s.z-t.z}function $v(s,t){return t.z-s.z}var Mh=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,n,i){let r=this.pool,a=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let o=r[this.index];a.push(o),this.index++,o.start=t,o.count=e,o.z=n,o.index=i}reset(){
this.list.length=0,this.index=0}},He=new Ut,Kv=new ot(1,1,1),kc=new Hi,Ra=new Ce,Mi=new Te,Ks=new A,td=new A,Qv=new A,Vc=new Mh,Le=new he,Ia=[];function jv(s,t,e=0){let n=t.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==t.array.constructor){let i=s.count;for(let r=0;r<i;r++)for(let a=0;a<
n;a++)t.setComponent(r+e,a,s.getComponent(r,a))}else t.array.set(s.array,e*n);t.needsUpdate=!0}function Si(s,t){if(s.constructor!==t.constructor){let e=Math.min(s.length,t.length);for(let n=0;n<e;n++)t[n]=s[n]}else{let e=Math.min(s.length,t.length);t.set(new s.constructor(s.buffer,0,e))}}var Xo=class extends he{get maxInstanceCount(){
return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}constructor(t,e,n=e*2,i){super(new Ft,
i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this.
_geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=t,this._maxVertexCount=e,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(t),this._multiDrawStarts=new Int32Array(t),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,
this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let t=Math.sqrt(this._maxInstanceCount*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4),n=new sn(e,t,t,ze,Xe);this._matricesTexture=n}_initIndirectTexture(){
let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);let e=new Uint32Array(t*t),n=new sn(e,t,t,Qr,Xn);this._indirectTexture=n}_initColorsTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);let e=new Float32Array(t*t*4).fill(1),n=new sn(e,t,t,ze,Xe);n.colorSpace=qt.workingColorSpace,this.
_colorsTexture=n}_initializeGeometry(t){let e=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(let r in t.attributes){let a=t.getAttribute(r),{array:o,itemSize:l,normalized:c}=a,h=new o.constructor(n*l),u=new Qt(h,l,c);e.setAttribute(r,u)}if(t.getIndex()!==
null){let r=n>65535?new Uint32Array(i):new Uint16Array(i);e.setIndex(new Qt(r,1))}this._geometryInitialized=!0}}_validateGeometry(t){let e=this.geometry;if(!!t.getIndex()!=!!e.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(let n in e.attributes){if(!t.hasAttribute(
n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=t.getAttribute(n),r=e.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and norma\
lized value.")}}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ce);let t=this.boundingBox,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;let r=e[n].geometryIndex;this.getMatrixAt(n,He),
this.getBoundingBoxAt(r,Ra).applyMatrix4(He),t.union(Ra)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Te);let t=this.boundingSphere,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;let r=e[n].geometryIndex;this.getMatrixAt(
n,He),this.getBoundingSphereAt(r,Mi).applyMatrix4(He),t.union(Mi)}}addInstance(t){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:t},i=null;this._availableInstanceIds.
length>0?(this._availableInstanceIds.sort(zc),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));let r=this._matricesTexture;He.identity().toArray(r.image.data,i*16),r.needsUpdate=!0;let a=this._colorsTexture;return a&&(Kv.toArray(a.
image.data,i*4),a.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(t,e=-1,n=-1){this._initializeGeometry(t),this._validateGeometry(t);let i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,
active:!0},r=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=e===-1?t.getAttribute("position").count:e;let a=t.getIndex();if(a!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?a.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||
i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(zc),l=this._availableGeometryIds.shift(),r[l]=i):(l=this._geometryCount,this.
_geometryCount++,r.push(i)),this.setGeometryAt(l,t),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(t,e){if(t>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(e);
let n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),a=e.getIndex(),o=this._geometryInfo[t];if(i&&a.count>o.reservedIndexCount||e.attributes.position.count>o.reservedVertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");let l=o.vertexStart,c=o.reservedVertexCount;
o.vertexCount=e.getAttribute("position").count;for(let h in n.attributes){let u=e.getAttribute(h),f=n.getAttribute(h);jv(u,f,l);let d=u.itemSize;for(let m=u.count,_=c;m<_;m++){let g=l+m;for(let p=0;p<d;p++)f.setComponent(g,p,0)}f.needsUpdate=!0,f.addUpdateRange(l*d,c*d)}if(i){let h=o.indexStart,u=o.
reservedIndexCount;o.indexCount=e.getIndex().count;for(let f=0;f<a.count;f++)r.setX(h+f,l+a.getX(f));for(let f=a.count,d=u;f<d;f++)r.setX(h+f,l);r.needsUpdate=!0,r.addUpdateRange(h,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,
e.boundingBox!==null&&(o.boundingBox=e.boundingBox.clone()),o.boundingSphere=null,e.boundingSphere!==null&&(o.boundingSphere=e.boundingSphere.clone()),this._visibilityChanged=!0,t}deleteGeometry(t){let e=this._geometryInfo;if(t>=e.length||e[t].active===!1)return this;let n=this._instanceInfo;for(let i=0,
r=n.length;i<r;i++)n[i].geometryIndex===t&&this.deleteInstance(i);return e[t].active=!1,this._availableGeometryIds.push(t),this._visibilityChanged=!0,this}deleteInstance(t){let e=this._instanceInfo;return t>=e.length||e[t].active===!1?this:(e[t].active=!1,this._availableInstanceIds.push(t),this._visibilityChanged=
!0,this)}optimize(){let t=0,e=0,n=this._geometryInfo,i=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),r=this.geometry;for(let a=0,o=n.length;a<o;a++){let l=i[a],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==e){let{indexStart:h,vertexStart:u,reservedIndexCount:f}=c,d=r.
index,m=d.array,_=t-u;for(let g=h;g<h+f;g++)m[g]=m[g]+_;d.array.copyWithin(e,h,h+f),d.addUpdateRange(e,f),c.indexStart=e}e+=c.reservedIndexCount}if(c.vertexStart!==t){let{vertexStart:h,reservedVertexCount:u}=c,f=r.attributes;for(let d in f){let m=f[d],{array:_,itemSize:g}=m;_.copyWithin(t*g,h*g,(h+u)*
g),m.addUpdateRange(t*g,u*g)}c.vertexStart=t}t+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart,this._nextIndexStart=r.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(t,e){if(t>=this._geometryCount)return null;
let n=this.geometry,i=this._geometryInfo[t];if(i.boundingBox===null){let r=new Ce,a=n.index,o=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;a&&(h=a.getX(h)),r.expandByPoint(Ks.fromBufferAttribute(o,h))}i.boundingBox=r}return e.copy(i.boundingBox),e}getBoundingSphereAt(t,e){
if(t>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[t];if(i.boundingSphere===null){let r=new Te;this.getBoundingBoxAt(t,Ra),Ra.getCenter(r.center);let a=n.index,o=n.attributes.position,l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let u=c;a&&(u=a.getX(u)),Ks.fromBufferAttribute(
o,u),l=Math.max(l,r.center.distanceToSquared(Ks))}r.radius=Math.sqrt(l),i.boundingSphere=r}return e.copy(i.boundingSphere),e}setMatrixAt(t,e){let n=this._instanceInfo,i=this._matricesTexture,r=this._matricesTexture.image.data;return t>=n.length||n[t].active===!1?this:(e.toArray(r,t*16),i.needsUpdate=
!0,this)}getMatrixAt(t,e){let n=this._instanceInfo,i=this._matricesTexture.image.data;return t>=n.length||n[t].active===!1?null:e.fromArray(i,t*16)}setColorAt(t,e){this._colorsTexture===null&&this._initColorsTexture();let n=this._colorsTexture,i=this._colorsTexture.image.data,r=this._instanceInfo;return t>=
r.length||r[t].active===!1?this:(e.toArray(i,t*4),n.needsUpdate=!0,this)}getColorAt(t,e){let n=this._colorsTexture.image.data,i=this._instanceInfo;return t>=i.length||i[t].active===!1?null:e.fromArray(n,t*4)}setVisibleAt(t,e){let n=this._instanceInfo;return t>=n.length||n[t].active===!1||n[t].visible===
e?this:(n[t].visible=e,this._visibilityChanged=!0,this)}getVisibleAt(t){let e=this._instanceInfo;return t>=e.length||e[t].active===!1?!1:e[t].visible}setGeometryIdAt(t,e){let n=this._instanceInfo,i=this._geometryInfo;return t>=n.length||n[t].active===!1||e>=i.length||i[e].active===!1?null:(n[t].geometryIndex=
e,this)}getGeometryIdAt(t){let e=this._instanceInfo;return t>=e.length||e[t].active===!1?-1:e[t].geometryIndex}getGeometryRangeAt(t,e={}){if(t<0||t>=this._geometryCount)return null;let n=this._geometryInfo[t];return e.vertexStart=n.vertexStart,e.vertexCount=n.vertexCount,e.reservedVertexCount=n.reservedVertexCount,
e.indexStart=n.indexStart,e.indexCount=n.indexCount,e.reservedIndexCount=n.reservedIndexCount,e.start=n.start,e.count=n.count,e}setInstanceCount(t){let e=this._availableInstanceIds,n=this._instanceInfo;for(e.sort(zc);e[e.length-1]===n.length;)n.pop(),e.pop();if(t<n.length)throw new Error(`BatchedMes\
h: Instance ids outside the range ${t} are being used. Cannot shrink instance count.`);let i=new Int32Array(t),r=new Int32Array(t);Si(this._multiDrawCounts,i),Si(this._multiDrawStarts,r),this._multiDrawCounts=i,this._multiDrawStarts=r,this._maxInstanceCount=t;let a=this._indirectTexture,o=this._matricesTexture,
l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),Si(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),Si(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),Si(l.image.data,this._colorsTexture.image.data))}setGeometrySize(t,e){
let n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>t)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>
e)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${e}. Cannot shrink further.`);let r=this.geometry;r.dispose(),this._maxVertexCount=t,this._maxIndexCount=e,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new Ft,this._initializeGeometry(r));
let a=this.geometry;r.index&&Si(r.index.array,a.index.array);for(let o in r.attributes)Si(r.attributes[o].array,a.attributes[o].array)}raycast(t,e){let n=this._instanceInfo,i=this._geometryInfo,r=this.matrixWorld,a=this.geometry;Le.material=this.material,Le.geometry.index=a.index,Le.geometry.attributes=
a.attributes,Le.geometry.boundingBox===null&&(Le.geometry.boundingBox=new Ce),Le.geometry.boundingSphere===null&&(Le.geometry.boundingSphere=new Te);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;let c=n[o].geometryIndex,h=i[c];Le.geometry.setDrawRange(h.start,h.count),this.
getMatrixAt(o,Le.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,Le.geometry.boundingBox),this.getBoundingSphereAt(c,Le.geometry.boundingSphere),Le.raycast(t,Ia);for(let u=0,f=Ia.length;u<f;u++){let d=Ia[u];d.object=this,d.batchId=o,e.push(d)}Ia.length=0}Le.material=null,Le.geometry.index=null,Le.
geometry.attributes={},Le.geometry.setDrawRange(0,1/0)}copy(t){return super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==
null?t.boundingSphere.clone():null,this._geometryInfo=t._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox!==null?e.boundingBox.clone():null,boundingSphere:e.boundingSphere!==null?e.boundingSphere.clone():null})),this._instanceInfo=t._instanceInfo.map(e=>({...e})),this._maxInstanceCount=t._maxInstanceCount,
this._maxVertexCount=t._maxVertexCount,this._maxIndexCount=t._maxIndexCount,this._geometryInitialized=t._geometryInitialized,this._geometryCount=t._geometryCount,this._multiDrawCounts=t._multiDrawCounts.slice(),this._multiDrawStarts=t._multiDrawStarts.slice(),this._matricesTexture=t._matricesTexture.
clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=t._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),
this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(t,e,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let a=i.getIndex(),
o=a===null?1:a.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,h=this._multiDrawCounts,u=this._geometryInfo,f=this.perObjectFrustumCulled,d=this._indirectTexture,m=d.image.data;f&&(He.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),kc.setFromProjectionMatrix(
He,t.coordinateSystem));let _=0;if(this.sortObjects){He.copy(this.matrixWorld).invert(),Ks.setFromMatrixPosition(n.matrixWorld).applyMatrix4(He),td.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(He);for(let y=0,v=l.length;y<v;y++)if(l[y].visible&&l[y].active){let x=l[y].geometryIndex;
this.getMatrixAt(y,He),this.getBoundingSphereAt(x,Mi).applyMatrix4(He);let P=!1;if(f&&(P=!kc.intersectsSphere(Mi)),!P){let T=u[x],C=Qv.subVectors(Mi.center,Ks).dot(td);Vc.push(T.start,T.count,C,y)}}let g=Vc.list,p=this.customSort;p===null?g.sort(r.transparent?$v:Jv):p.call(this,g,n);for(let y=0,v=g.
length;y<v;y++){let x=g[y];c[_]=x.start*o,h[_]=x.count,m[_]=x.index,_++}Vc.reset()}else for(let g=0,p=l.length;g<p;g++)if(l[g].visible&&l[g].active){let y=l[g].geometryIndex,v=!1;if(f&&(this.getMatrixAt(g,He),this.getBoundingSphereAt(y,Mi).applyMatrix4(He),v=!kc.intersectsSphere(Mi)),!v){let x=u[y];
c[_]=x.start*o,h[_]=x.count,m[_]=g,_++}}d.needsUpdate=!0,this._multiDrawCount=_,this._visibilityChanged=!1}onBeforeShadow(t,e,n,i,r,a){this.onBeforeRender(t,null,i,r,a)}},Re=class extends we{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new ot(
16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},qo=new A,Yo=new A,ed=new Ut,
Qs=new li,Pa=new Te,Hc=new A,nd=new A,wn=class extends te{constructor(t=new Ft,e=new Re){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=
t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)qo.fromBufferAttribute(e,i-1),Yo.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=qo.distanceTo(Yo);t.setAttribute("lineDistance",new gt(n,1))}else console.warn("TH\
REE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Pa.copy(n.boundingSphere),Pa.applyMatrix4(i),Pa.
radius+=r,t.ray.intersectsSphere(Pa)===!1)return;ed.copy(i).invert(),Qs.copy(t.ray).applyMatrix4(ed);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=d,
g=m-1;_<g;_+=c){let p=h.getX(_),y=h.getX(_+1),v=Da(this,t,Qs,l,p,y);v&&e.push(v)}if(this.isLineLoop){let _=h.getX(m-1),g=h.getX(d),p=Da(this,t,Qs,l,_,g);p&&e.push(p)}}else{let d=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let _=d,g=m-1;_<g;_+=c){let p=Da(this,t,Qs,l,_,_+1);p&&e.push(
p)}if(this.isLineLoop){let _=Da(this,t,Qs,l,m-1,d);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(
r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Da(s,t,e,n,i,r){let a=s.geometry.attributes.position;if(qo.fromBufferAttribute(a,i),Yo.fromBufferAttribute(a,r),e.distanceSqToSegment(qo,Yo,Hc,nd)>n)return;Hc.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(
Hc);if(!(l<t.near||l>t.far))return{distance:l,point:nd.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}var id=new A,sd=new A,on=class extends wn{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.
geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)id.fromBufferAttribute(e,i),sd.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+id.distanceTo(sd);t.setAttribute("lineDistance",new gt(n,1))}else console.warn("THREE.LineSegments.computeLineDistance\
s(): Computation only possible with non-indexed BufferGeometry.");return this}},Zo=class extends wn{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}},Dr=class extends we{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new ot(16777215),
this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},rd=new Ut,Sh=new li,La=new Te,
Ua=new A,Jo=class extends te{constructor(t=new Ft,e=new Dr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){
let n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),La.copy(n.boundingSphere),La.applyMatrix4(i),La.radius+=r,t.ray.intersectsSphere(La)===!1)return;rd.copy(i).invert(),Sh.copy(t.ray).applyMatrix4(rd);let o=r/((this.scale.
x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let f=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let m=f,_=d;m<_;m++){let g=c.getX(m);Ua.fromBufferAttribute(u,g),ad(Ua,g,l,i,t,e,this)}}else{let f=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);
for(let m=f,_=d;m<_;m++)Ua.fromBufferAttribute(u,m),ad(Ua,m,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||
String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ad(s,t,e,n,i,r,a){let o=Sh.distanceSqToPoint(s);if(o<e){let l=new A;Sh.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.
sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var bh=class extends xe{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isVideoTexture=!0,this.minFilter=a!==void 0?a:ye,this.magFilter=r!==void 0?r:ye,this.generateMipmaps=!1;let h=this;function u(){h.needsUpdate=
!0,t.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in t&&t.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){let t=this.image;"requestVideoFrameCallback"in t===!1&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}},Eh=class extends xe{constructor(t,e){
super({width:t,height:e}),this.isFramebufferTexture=!0,this.magFilter=Ae,this.minFilter=Ae,this.generateMipmaps=!1,this.needsUpdate=!0}},Ps=class extends xe{constructor(t,e,n,i,r,a,o,l,c,h,u,f){super(null,a,o,l,c,h,i,r,u,f),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.
flipY=!1,this.generateMipmaps=!1}},Th=class extends Ps{constructor(t,e,n,i,r,a){super(t,e,n,r,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=nn,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},wh=class extends Ps{constructor(t,e,n){
super(void 0,t[0].width,t[0].height,e,n,Wn),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=t}},Ah=class extends xe{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ke=class{constructor(){this.type="Curve",this.arcLengthDivisions=
200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.
getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=
t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>
0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],f=n[i+1]-h,d=(a-h)/f;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new X:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.
getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new A,i=[],r=[],a=[],o=new A,l=new Ut;for(let d=0;d<=t;d++){let m=d/t;i[d]=this.getTangentAt(m,new A)}r[0]=new A,a[0]=new A;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,
0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(pe(i[d-1].
dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,m))}a[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(pe(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],d*m)),a[m].crossVectors(i[m],r[m])}return{tangents:i,
normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.
arcLengthDivisions=t.arcLengthDivisions,this}},Ds=class extends Ke{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new X){
let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==
0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.
aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.
fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},$o=class extends Ds{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type=
"ArcCurve"}};function Bu(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,i(a,o,
f,d)},calc:function(r){let a=r*r,o=a*r;return s+t*r+e*a+n*o}}}var Na=new A,Gc=new Bu,Wc=new Bu,Xc=new Bu,Ko=class extends Ke{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new A){
let n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Na.subVectors(i[0],i[1]).add(i[0]),c=Na);let u=i[o%r],f=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%
r]:(Na.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Na),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=
_),Gc.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,m,_,g),Wc.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,m,_,g),Xc.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(Gc.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Wc.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Xc.initCatmullRom(
c.z,u.z,f.z,h.z,this.tension));return n.set(Gc.calc(l),Wc.calc(l),Xc.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.
toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.
push(new A().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function od(s,t,e,n,i){let r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function ty(s,t){let e=1-s;return e*e*t}function ey(s,t){return 2*(1-s)*s*t}function ny(s,t){
return s*s*t}function ur(s,t,e,n){return ty(s,t)+ey(s,e)+ny(s,n)}function iy(s,t){let e=1-s;return e*e*e*t}function sy(s,t){let e=1-s;return 3*e*e*s*t}function ry(s,t){return 3*(1-s)*s*s*t}function ay(s,t){return s*s*s*t}function fr(s,t,e,n,i){return iy(s,t)+sy(s,e)+ry(s,n)+ay(s,i)}var Lr=class extends Ke{constructor(t=new X,e=new X,n=new X,i=new X){
super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new X){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(fr(t,i.x,r.x,a.x,o.x),fr(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.
v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),
this}},Qo=class extends Ke{constructor(t=new A,e=new A,n=new A,i=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new A){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(fr(t,i.x,r.x,a.x,o.x),fr(t,i.y,r.y,a.y,o.
y),fr(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(
t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ur=class extends Ke{constructor(t=new X,e=new X){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new X){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(
this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new X){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();
return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},jo=class extends Ke{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){let n=e;return t===
1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(
t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Nr=class extends Ke{constructor(t=new X,e=new X,n=new X){super(),this.isQuadraticBezierCurve=!0,this.type="Quadr\
aticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new X){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ur(t,i.x,r.x,a.x),ur(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),
t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Fr=class extends Ke{constructor(t=new A,e=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.
v0=t,this.v1=e,this.v2=n}getPoint(t,e=new A){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ur(t,i.x,r.x,a.x),ur(t,i.y,r.y,a.y),ur(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),
t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Or=class extends Ke{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new X){let n=e,i=this.
points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(od(o,l.x,c.x,h.x,u.x),od(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.
push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new X().fromArray(
i))}return this}},tl=Object.freeze({__proto__:null,ArcCurve:$o,CatmullRomCurve3:Ko,CubicBezierCurve:Lr,CubicBezierCurve3:Qo,EllipseCurve:Ds,LineCurve:Ur,LineCurve3:jo,QuadraticBezierCurve:Nr,QuadraticBezierCurve3:Fr,SplineCurve:Or}),el=class extends Ke{constructor(){super(),this.type="CurvePath",this.
curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new tl[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.
getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){
if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.
autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&
e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.
curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new tl[i.type]().fromJSON(i))}return this}},Wi=class extends el{constructor(t){
super(),this.type="Path",this.currentPoint=new X,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Ur(this.currentPoint.clone(),new X(t,e));
return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new Nr(this.currentPoint.clone(),new X(t,e),new X(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){let o=new Lr(this.currentPoint.clone(),new X(t,e),new X(n,i),new X(
r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Or(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,
r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){let c=new Ds(t,e,n,i,r,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.
equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.
fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Br=class s extends Ft{constructor(t=[new X(0,-.5),new X(.5,0),new X(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=pe(i,0,Math.PI*2);let r=[],
a=[],o=[],l=[],c=[],h=1/e,u=new A,f=new X,d=new A,m=new A,_=new A,g=0,p=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:g=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,d.x=p*1,d.y=-g,d.z=p*0,_.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:g=t[y+1].x-t[y].x,p=
t[y+1].y-t[y].y,d.x=p*1,d.y=-g,d.z=p*0,m.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),l.push(d.x,d.y,d.z),_.copy(m)}for(let y=0;y<=e;y++){let v=n+y*h*i,x=Math.sin(v),P=Math.cos(v);for(let T=0;T<=t.length-1;T++){u.x=t[T].x*x,u.y=t[T].y,u.z=t[T].x*P,a.push(u.x,u.y,u.z),f.x=y/e,f.y=T/(t.length-1),o.
push(f.x,f.y);let C=l[3*T+0]*x,R=l[3*T+1],b=l[3*T+0]*P;c.push(C,R,b)}}for(let y=0;y<e;y++)for(let v=0;v<t.length-1;v++){let x=v+y*t.length,P=x,T=x+t.length,C=x+t.length+1,R=x+1;r.push(P,T,R),r.push(C,R,T)}this.setIndex(r),this.setAttribute("position",new gt(a,3)),this.setAttribute("uv",new gt(o,2)),
this.setAttribute("normal",new gt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.points,t.segments,t.phiStart,t.phiLength)}},nl=class s extends Br{constructor(t=1,e=1,n=4,i=8){let r=new Wi;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(
0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new s(t.radius,t.length,t.capSegments,t.radialSegments)}},il=class s extends Ft{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type=
"CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new A,h=new X;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=n+u/e*i;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/
t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new gt(a,3)),this.setAttribute("normal",new gt(o,3)),this.setAttribute("uv",new gt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){
return new s(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ls=class s extends Ft{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};
let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],f=[],d=[],m=0,_=[],g=n/2,p=0;y(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new gt(u,3)),this.setAttribute("normal",new gt(f,3)),this.setAttribute("uv",new gt(d,2));function y(){let x=new A,P=new A,T=0,C=(e-t)/
n;for(let R=0;R<=r;R++){let b=[],M=R/r,D=M*(e-t)+t;for(let k=0;k<=i;k++){let O=k/i,V=O*l+o,J=Math.sin(V),H=Math.cos(V);P.x=D*J,P.y=-M*n+g,P.z=D*H,u.push(P.x,P.y,P.z),x.set(J,C,H).normalize(),f.push(x.x,x.y,x.z),d.push(O,1-M),b.push(m++)}_.push(b)}for(let R=0;R<i;R++)for(let b=0;b<r;b++){let M=_[b][R],
D=_[b+1][R],k=_[b+1][R+1],O=_[b][R+1];(t>0||b!==0)&&(h.push(M,D,O),T+=3),(e>0||b!==r-1)&&(h.push(D,k,O),T+=3)}c.addGroup(p,T,0),p+=T}function v(x){let P=m,T=new X,C=new A,R=0,b=x===!0?t:e,M=x===!0?1:-1;for(let k=1;k<=i;k++)u.push(0,g*M,0),f.push(0,M,0),d.push(.5,.5),m++;let D=m;for(let k=0;k<=i;k++){
let V=k/i*l+o,J=Math.cos(V),H=Math.sin(V);C.x=b*H,C.y=g*M,C.z=b*J,u.push(C.x,C.y,C.z),f.push(0,M,0),T.x=J*.5+.5,T.y=H*.5*M+.5,d.push(T.x,T.y),m++}for(let k=0;k<i;k++){let O=P+k,V=D+k;x===!0?h.push(V,V+1,O):h.push(V+1,V,O),R+=3}c.addGroup(p,R,x===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=
Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},sl=class s extends Ls{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",
this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ui=class s extends Ft{constructor(t=[],e=[],n=1,i=0){super(),this.
type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new gt(r,3)),this.setAttribute("normal",new gt(r.slice(),3)),this.setAttribute("uv",new gt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(y){
let v=new A,x=new A,P=new A;for(let T=0;T<e.length;T+=3)d(e[T+0],v),d(e[T+1],x),d(e[T+2],P),l(v,x,P,y)}function l(y,v,x,P){let T=P+1,C=[];for(let R=0;R<=T;R++){C[R]=[];let b=y.clone().lerp(x,R/T),M=v.clone().lerp(x,R/T),D=T-R;for(let k=0;k<=D;k++)k===0&&R===T?C[R][k]=b:C[R][k]=b.clone().lerp(M,k/D)}
for(let R=0;R<T;R++)for(let b=0;b<2*(T-R)-1;b++){let M=Math.floor(b/2);b%2===0?(f(C[R][M+1]),f(C[R+1][M]),f(C[R][M])):(f(C[R][M+1]),f(C[R+1][M+1]),f(C[R+1][M]))}}function c(y){let v=new A;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(y),r[x+0]=v.x,r[x+1]=v.
y,r[x+2]=v.z}function h(){let y=new A;for(let v=0;v<r.length;v+=3){y.x=r[v+0],y.y=r[v+1],y.z=r[v+2];let x=g(y)/2/Math.PI+.5,P=p(y)/Math.PI+.5;a.push(x,1-P)}m(),u()}function u(){for(let y=0;y<a.length;y+=6){let v=a[y+0],x=a[y+2],P=a[y+4],T=Math.max(v,x,P),C=Math.min(v,x,P);T>.9&&C<.1&&(v<.2&&(a[y+0]+=
1),x<.2&&(a[y+2]+=1),P<.2&&(a[y+4]+=1))}}function f(y){r.push(y.x,y.y,y.z)}function d(y,v){let x=y*3;v.x=t[x+0],v.y=t[x+1],v.z=t[x+2]}function m(){let y=new A,v=new A,x=new A,P=new A,T=new X,C=new X,R=new X;for(let b=0,M=0;b<r.length;b+=9,M+=6){y.set(r[b+0],r[b+1],r[b+2]),v.set(r[b+3],r[b+4],r[b+5]),
x.set(r[b+6],r[b+7],r[b+8]),T.set(a[M+0],a[M+1]),C.set(a[M+2],a[M+3]),R.set(a[M+4],a[M+5]),P.copy(y).add(v).add(x).divideScalar(3);let D=g(P);_(T,M+0,y,D),_(C,M+2,v,D),_(R,M+4,x,D)}}function _(y,v,x,P){P<0&&y.x===1&&(a[v]=y.x-1),x.x===0&&x.z===0&&(a[v]=P/2/Math.PI+.5)}function g(y){return Math.atan2(
y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.details)}},rl=class s extends ui{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,
i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,
3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},Fa=new A,Oa=new A,qc=new A,Ba=new Mn,al=class extends Ft{constructor(t=null,e=1){
if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let i=Math.pow(10,4),r=Math.cos(Fi*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+
1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:_,b:g,c:p}=Ba;if(_.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),Ba.getNormal(qc),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.
round(g.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let y=0;y<3;y++){let v=(y+1)%3,x=u[y],P=u[v],T=Ba[h[y]],C=Ba[h[v]],R=`${x}_${P}`,b=`${P}_${x}`;b in f&&f[b]?(qc.dot(f[b].normal)<=r&&(d.push(T.x,T.y,T.z),d.push(C.x,C.y,C.
z)),f[b]=null):R in f||(f[R]={index0:c[y],index1:c[v],normal:qc.clone()})}}for(let m in f)if(f[m]){let{index0:_,index1:g}=f[m];Fa.fromBufferAttribute(o,_),Oa.fromBufferAttribute(o,g),d.push(Fa.x,Fa.y,Fa.z),d.push(Oa.x,Oa.y,Oa.z)}this.setAttribute("position",new gt(d,3))}}copy(t){return super.copy(t),
this.parameters=Object.assign({},t.parameters),this}},Hn=class extends Wi{constructor(t){super(t),this.uuid=Je(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),
holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}
return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new Wi().fromJSON(i))}return this}},oy={triangulate:function(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=Pp(s,0,i,e,!0),a=[];if(!r||r.next===r.prev)return a;
let o,l,c,h,u,f,d;if(n&&(r=fy(s,t,r,e)),s.length>80*e){o=c=s[0],l=h=s[1];for(let m=e;m<i;m+=e)u=s[m],f=s[m+1],u<o&&(o=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);d=Math.max(c-o,h-l),d=d!==0?32767/d:0}return zr(r,a,e,o,l,d,0),a}};function Pp(s,t,e,n,i){let r,a;if(i===by(s,t,e,n)>0)for(r=t;r<e;r+=n)a=ld(r,s[r],
s[r+1],a);else for(r=e-n;r>=t;r-=n)a=ld(r,s[r],s[r+1],a);return a&&ic(a,a.next)&&(Vr(a),a=a.next),a}function Xi(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(ic(e,e.next)||ue(e.prev,e,e.next)===0)){if(Vr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function zr(s,t,e,n,i,r,a){
if(!s)return;!a&&r&&_y(s,n,i,r);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?cy(s,n,i,r):ly(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),Vr(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=hy(Xi(s),t,e),zr(s,t,e,n,i,r,2)):a===2&&uy(s,t,e,n,i,r):zr(Xi(s),t,e,n,i,r,1);break}}}
function ly(s){let t=s.prev,e=s,n=s.next;if(ue(t,e,n)>=0)return!1;let i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=i<r?i<a?i:a:r<a?r:a,u=o<l?o<c?o:c:l<c?l:c,f=i>r?i>a?i:a:r>a?r:a,d=o>l?o>c?o:c:l>c?l:c,m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=f&&m.y>=u&&m.y<=d&&Ms(i,o,r,l,a,c,m.x,m.y)&&ue(m.prev,m,m.next)>=0)return!1;
m=m.next}return!0}function cy(s,t,e,n){let i=s.prev,r=s,a=s.next;if(ue(i,r,a)>=0)return!1;let o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,f=a.y,d=o<l?o<c?o:c:l<c?l:c,m=h<u?h<f?h:f:u<f?u:f,_=o>l?o>c?o:c:l>c?l:c,g=h>u?h>f?h:f:u>f?u:f,p=Ch(d,m,t,e,n),y=Ch(_,g,t,e,n),v=s.prevZ,x=s.nextZ;for(;v&&v.z>=p&&x&&x.z<=y;){if(v.
x>=d&&v.x<=_&&v.y>=m&&v.y<=g&&v!==i&&v!==a&&Ms(o,h,l,u,c,f,v.x,v.y)&&ue(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=d&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&Ms(o,h,l,u,c,f,x.x,x.y)&&ue(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=d&&v.x<=_&&v.y>=m&&v.y<=g&&v!==i&&v!==a&&Ms(o,h,l,u,c,f,v.
x,v.y)&&ue(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=y;){if(x.x>=d&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&Ms(o,h,l,u,c,f,x.x,x.y)&&ue(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function hy(s,t,e){let n=s;do{let i=n.prev,r=n.next.next;!ic(i,r)&&Dp(i,n,n.next,r)&&kr(i,r)&&kr(r,i)&&(t.push(
i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Vr(n),Vr(n.next),n=s=r),n=n.next}while(n!==s);return Xi(n)}function uy(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&yy(a,o)){let l=Lp(a,o);a=Xi(a,a.next),l=Xi(l,l.next),zr(a,t,e,n,i,r,0),zr(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==
s)}function fy(s,t,e,n){let i=[],r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Pp(s,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(vy(c));for(i.sort(dy),r=0;r<i.length;r++)e=py(i[r],e);return e}function dy(s,t){return s.x-t.x}function py(s,t){let e=my(s,t);if(!e)return t;let n=Lp(
e,s);return Xi(n,n.next),Xi(e,e.next)}function my(s,t){let e=t,n=-1/0,i,r=s.x,a=s.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){let f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,i=e.x<e.next.x?e:e.next,f===r))return i}e=e.next}while(e!==t);if(!i)return null;let o=i,l=i.x,c=i.y,h=1/0,
u;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&Ms(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),kr(e,s)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&gy(i,e)))&&(i=e,h=u)),e=e.next;while(e!==o);return i}function gy(s,t){return ue(s.prev,s,t.prev)<0&&ue(t.next,s,s.next)<0}function _y(s,t,e,n){let i=s;do i.z===
0&&(i.z=Ch(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,xy(i)}function xy(s){let t,e,n,i,r,a,o,l,c=1;do{for(e=s,s=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,
o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(a>1);return s}function Ch(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|
t<<1)&1431655765,s|t<<1}function vy(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Ms(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function yy(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!My(s,t)&&(kr(
s,t)&&kr(t,s)&&Sy(s,t)&&(ue(s.prev,s,t.prev)||ue(s,t.prev,t))||ic(s,t)&&ue(s.prev,s,s.next)>0&&ue(t.prev,t,t.next)>0)}function ue(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function ic(s,t){return s.x===t.x&&s.y===t.y}function Dp(s,t,e,n){let i=ka(ue(s,t,e)),r=ka(ue(s,t,n)),a=ka(ue(e,n,s)),
o=ka(ue(e,n,t));return!!(i!==r&&a!==o||i===0&&za(s,e,t)||r===0&&za(s,n,t)||a===0&&za(e,s,n)||o===0&&za(e,t,n))}function za(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function ka(s){return s>0?1:s<0?-1:0}function My(s,t){let e=s;do{if(e.
i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Dp(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function kr(s,t){return ue(s.prev,s,s.next)<0?ue(s,t,s.next)>=0&&ue(s,s.prev,t)>=0:ue(s,t,s.prev)<0||ue(s,s.next,t)<0}function Sy(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.
y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Lp(s,t){let e=new Rh(s.i,s.x,s.y),n=new Rh(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function ld(s,t,e,n){let i=new Rh(
s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Vr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Rh(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=
null,this.nextZ=null,this.steiner=!1}function by(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var En=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){
let n=[],i=[],r=[];cd(t),hd(n,t);let a=t.length;e.forEach(cd);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,hd(n,e[l]);let o=oy.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function cd(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function hd(s,t){for(let e=0;e<
t.length;e++)s.push(t[e].x),s.push(t[e].y)}var ol=class s extends Ft{constructor(t=new Hn([new X(.5,.5),new X(-.5,.5),new X(-.5,-.5),new X(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){
let c=t[o];a(c)}this.setAttribute("position",new gt(i,3)),this.setAttribute("uv",new gt(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==
void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:Ey,v,x=!1,P,T,C,R;p&&(v=p.getSpacedPoints(h),x=!0,f=!1,P=p.computeFrenetFrames(h,!1),T=new A,
C=new A,R=new A),f||(g=0,d=0,m=0,_=0);let b=o.extractPoints(c),M=b.shape,D=b.holes;if(!En.isClockWise(M)){M=M.reverse();for(let K=0,nt=D.length;K<nt;K++){let I=D[K];En.isClockWise(I)&&(D[K]=I.reverse())}}let O=En.triangulateShape(M,D),V=M;for(let K=0,nt=D.length;K<nt;K++){let I=D[K];M=M.concat(I)}function J(K,nt,I){
return nt||console.error("THREE.ExtrudeGeometry: vec does not exist"),K.clone().addScaledVector(nt,I)}let H=M.length,et=O.length;function G(K,nt,I){let Ct,j,vt,at=K.x-nt.x,Pt=K.y-nt.y,_t=I.x-K.x,w=I.y-K.y,S=at*at+Pt*Pt,F=at*w-Pt*_t;if(Math.abs(F)>Number.EPSILON){let q=Math.sqrt(S),Q=Math.sqrt(_t*_t+
w*w),Y=nt.x-Pt/q,Et=nt.y+at/q,ht=I.x-w/Q,xt=I.y+_t/Q,Yt=((ht-Y)*w-(xt-Et)*_t)/(at*w-Pt*_t);Ct=Y+at*Yt-K.x,j=Et+Pt*Yt-K.y;let tt=Ct*Ct+j*j;if(tt<=2)return new X(Ct,j);vt=Math.sqrt(tt/2)}else{let q=!1;at>Number.EPSILON?_t>Number.EPSILON&&(q=!0):at<-Number.EPSILON?_t<-Number.EPSILON&&(q=!0):Math.sign(Pt)===
Math.sign(w)&&(q=!0),q?(Ct=-Pt,j=at,vt=Math.sqrt(S)):(Ct=at,j=Pt,vt=Math.sqrt(S/2))}return new X(Ct/vt,j/vt)}let lt=[];for(let K=0,nt=V.length,I=nt-1,Ct=K+1;K<nt;K++,I++,Ct++)I===nt&&(I=0),Ct===nt&&(Ct=0),lt[K]=G(V[K],V[I],V[Ct]);let mt=[],St,kt=lt.concat();for(let K=0,nt=D.length;K<nt;K++){let I=D[K];
St=[];for(let Ct=0,j=I.length,vt=j-1,at=Ct+1;Ct<j;Ct++,vt++,at++)vt===j&&(vt=0),at===j&&(at=0),St[Ct]=G(I[Ct],I[vt],I[at]);mt.push(St),kt=kt.concat(St)}for(let K=0;K<g;K++){let nt=K/g,I=d*Math.cos(nt*Math.PI/2),Ct=m*Math.sin(nt*Math.PI/2)+_;for(let j=0,vt=V.length;j<vt;j++){let at=J(V[j],lt[j],Ct);rt(
at.x,at.y,-I)}for(let j=0,vt=D.length;j<vt;j++){let at=D[j];St=mt[j];for(let Pt=0,_t=at.length;Pt<_t;Pt++){let w=J(at[Pt],St[Pt],Ct);rt(w.x,w.y,-I)}}}let ee=m+_;for(let K=0;K<H;K++){let nt=f?J(M[K],kt[K],ee):M[K];x?(C.copy(P.normals[0]).multiplyScalar(nt.x),T.copy(P.binormals[0]).multiplyScalar(nt.y),
R.copy(v[0]).add(C).add(T),rt(R.x,R.y,R.z)):rt(nt.x,nt.y,0)}for(let K=1;K<=h;K++)for(let nt=0;nt<H;nt++){let I=f?J(M[nt],kt[nt],ee):M[nt];x?(C.copy(P.normals[K]).multiplyScalar(I.x),T.copy(P.binormals[K]).multiplyScalar(I.y),R.copy(v[K]).add(C).add(T),rt(R.x,R.y,R.z)):rt(I.x,I.y,u/h*K)}for(let K=g-1;K>=
0;K--){let nt=K/g,I=d*Math.cos(nt*Math.PI/2),Ct=m*Math.sin(nt*Math.PI/2)+_;for(let j=0,vt=V.length;j<vt;j++){let at=J(V[j],lt[j],Ct);rt(at.x,at.y,u+I)}for(let j=0,vt=D.length;j<vt;j++){let at=D[j];St=mt[j];for(let Pt=0,_t=at.length;Pt<_t;Pt++){let w=J(at[Pt],St[Pt],Ct);x?rt(w.x,w.y+v[h-1].y,v[h-1].x+
I):rt(w.x,w.y,u+I)}}}Z(),it();function Z(){let K=i.length/3;if(f){let nt=0,I=H*nt;for(let Ct=0;Ct<et;Ct++){let j=O[Ct];It(j[2]+I,j[1]+I,j[0]+I)}nt=h+g*2,I=H*nt;for(let Ct=0;Ct<et;Ct++){let j=O[Ct];It(j[0]+I,j[1]+I,j[2]+I)}}else{for(let nt=0;nt<et;nt++){let I=O[nt];It(I[2],I[1],I[0])}for(let nt=0;nt<
et;nt++){let I=O[nt];It(I[0]+H*h,I[1]+H*h,I[2]+H*h)}}n.addGroup(K,i.length/3-K,0)}function it(){let K=i.length/3,nt=0;bt(V,nt),nt+=V.length;for(let I=0,Ct=D.length;I<Ct;I++){let j=D[I];bt(j,nt),nt+=j.length}n.addGroup(K,i.length/3-K,1)}function bt(K,nt){let I=K.length;for(;--I>=0;){let Ct=I,j=I-1;j<
0&&(j=K.length-1);for(let vt=0,at=h+g*2;vt<at;vt++){let Pt=H*vt,_t=H*(vt+1),w=nt+Ct+Pt,S=nt+j+Pt,F=nt+j+_t,q=nt+Ct+_t;Ot(w,S,F,q)}}}function rt(K,nt,I){l.push(K),l.push(nt),l.push(I)}function It(K,nt,I){Lt(K),Lt(nt),Lt(I);let Ct=i.length/3,j=y.generateTopUV(n,i,Ct-3,Ct-2,Ct-1);Jt(j[0]),Jt(j[1]),Jt(j[2])}
function Ot(K,nt,I,Ct){Lt(K),Lt(nt),Lt(Ct),Lt(nt),Lt(I),Lt(Ct);let j=i.length/3,vt=y.generateSideWallUV(n,i,j-6,j-3,j-2,j-1);Jt(vt[0]),Jt(vt[1]),Jt(vt[3]),Jt(vt[1]),Jt(vt[2]),Jt(vt[3])}function Lt(K){i.push(l[K*3+0]),i.push(l[K*3+1]),i.push(l[K*3+2])}function Jt(K){r.push(K.x),r.push(K.y)}}}copy(t){
return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Ty(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let i=t.options.extrudePath;return i!==
void 0&&(t.options.extrudePath=new tl[i.type]().fromJSON(i)),new s(n,t.options)}},Ey={generateTopUV:function(s,t,e,n,i){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new X(r,a),new X(o,l),new X(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],
c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[i*3],d=t[i*3+1],m=t[i*3+2],_=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new X(a,1-l),new X(c,1-u),new X(f,1-m),new X(_,1-p)]:[new X(o,1-l),new X(h,1-u),new X(d,1-m),new X(g,1-p)]}};function Ty(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,
i=s.length;n<i;n++){let r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var ll=class s extends ui{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,
0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.
radius,t.detail)}},Hr=class s extends ui{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},cl=class s extends Ft{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.
PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],h=[],u=t,f=(e-t)/i,d=new A,m=new X;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){let p=r+g/n*a;d.x=u*Math.cos(
p),d.y=u*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),m.x=(d.x/e+1)/2,m.y=(d.y/e+1)/2,h.push(m.x,m.y)}u+=f}for(let _=0;_<i;_++){let g=_*(n+1);for(let p=0;p<n;p++){let y=p+g,v=y,x=y+n+1,P=y+n+2,T=y+1;o.push(v,x,T),o.push(x,P,T)}}this.setIndex(o),this.setAttribute("position",new gt(l,3)),this.setAttribute(
"normal",new gt(c,3)),this.setAttribute("uv",new gt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},hl=class s extends Ft{constructor(t=new Hn(
[new X(0,.5),new X(-.5,-.5),new X(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],i=[],r=[],a=[],o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("posit\
ion",new gt(i,3)),this.setAttribute("normal",new gt(r,3)),this.setAttribute("uv",new gt(a,2));function c(h){let u=i.length/3,f=h.extractPoints(e),d=f.shape,m=f.holes;En.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,p=m.length;g<p;g++){let y=m[g];En.isClockWise(y)===!0&&(m[g]=y.reverse())}let _=En.
triangulateShape(d,m);for(let g=0,p=m.length;g<p;g++){let y=m[g];d=d.concat(y)}for(let g=0,p=d.length;g<p;g++){let y=d[g];i.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let g=0,p=_.length;g<p;g++){let y=_[g],v=y[0]+u,x=y[1]+u,P=y[2]+u;n.push(v,x,P),l+=3}}}copy(t){return super.copy(t),this.parameters=
Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return wy(e,t)}static fromJSON(t,e){let n=[];for(let i=0,r=t.shapes.length;i<r;i++){let a=e[t.shapes[i]];n.push(a)}return new s(n,t.curveSegments)}};function wy(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,
n=s.length;e<n;e++){let i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}var Gr=class s extends Ft{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,
thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new A,f=new A,d=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){let y=[],v=p/n,x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let P=0;P<=e;P++){let T=P/e;u.x=-t*Math.cos(i+T*r)*Math.sin(a+
v*o),u.y=t*Math.cos(a+v*o),u.z=t*Math.sin(i+T*r)*Math.sin(a+v*o),m.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),g.push(T+x,1-v),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){let v=h[p][y+1],x=h[p][y],P=h[p+1][y],T=h[p+1][y+1];(p!==0||a>0)&&d.push(v,x,T),(p!==n-1||l<Math.
PI)&&d.push(x,P,T)}this.setIndex(d),this.setAttribute("position",new gt(m,3)),this.setAttribute("normal",new gt(_,3)),this.setAttribute("uv",new gt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,
t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},ul=class s extends ui{constructor(t=1,e=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},fl=class s extends Ft{constructor(t=1,e=.4,n=12,i=48,r=Math.
PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],h=new A,u=new A,f=new A;for(let d=0;d<=n;d++)for(let m=0;m<=i;m++){let _=m/i*r,g=d/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(_),
u.y=(t+e*Math.cos(g))*Math.sin(_),u.z=e*Math.sin(g),o.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(m/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let m=1;m<=i;m++){let _=(i+1)*d+m-1,g=(i+1)*(d-1)+m-1,p=(i+1)*(d-1)+m,y=(i+1)*d+m;a.push(_,g,
y),a.push(g,p,y)}this.setIndex(a),this.setAttribute("position",new gt(o,3)),this.setAttribute("normal",new gt(l,3)),this.setAttribute("uv",new gt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.
tubularSegments,t.arc)}},dl=class s extends Ft{constructor(t=1,e=.4,n=64,i=8,r=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:r,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],l=[],c=[],h=[],u=new A,f=new A,d=new A,m=new A,_=new A,g=new A,
p=new A;for(let v=0;v<=n;++v){let x=v/n*r*Math.PI*2;y(x,r,a,t,d),y(x+.01,r,a,t,m),g.subVectors(m,d),p.addVectors(m,d),_.crossVectors(g,p),p.crossVectors(_,g),_.normalize(),p.normalize();for(let P=0;P<=i;++P){let T=P/i*Math.PI*2,C=-e*Math.cos(T),R=e*Math.sin(T);u.x=d.x+(C*p.x+R*_.x),u.y=d.y+(C*p.y+R*
_.y),u.z=d.z+(C*p.z+R*_.z),l.push(u.x,u.y,u.z),f.subVectors(u,d).normalize(),c.push(f.x,f.y,f.z),h.push(v/n),h.push(P/i)}}for(let v=1;v<=n;v++)for(let x=1;x<=i;x++){let P=(i+1)*(v-1)+(x-1),T=(i+1)*v+(x-1),C=(i+1)*v+x,R=(i+1)*(v-1)+x;o.push(P,T,R),o.push(T,C,R)}this.setIndex(o),this.setAttribute("pos\
ition",new gt(l,3)),this.setAttribute("normal",new gt(c,3)),this.setAttribute("uv",new gt(h,2));function y(v,x,P,T,C){let R=Math.cos(v),b=Math.sin(v),M=P/x*v,D=Math.cos(M);C.x=T*(2+D)*.5*R,C.y=T*(2+D)*b*.5,C.z=T*Math.sin(M)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),
this}static fromJSON(t){return new s(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}},pl=class s extends Ft{constructor(t=new Fr(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,
closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new A,l=new A,c=new X,h=new A,u=[],f=[],d=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new gt(u,3)),this.setAttribute("normal",new gt(f,3)),this.setAttribute("uv",
new gt(d,2));function _(){for(let v=0;v<e;v++)g(v);g(r===!1?e:0),y(),p()}function g(v){h=t.getPointAt(v/e,h);let x=a.normals[v],P=a.binormals[v];for(let T=0;T<=i;T++){let C=T/i*Math.PI*2,R=Math.sin(C),b=-Math.cos(C);l.x=b*x.x+R*P.x,l.y=b*x.y+R*P.y,l.z=b*x.z+R*P.z,l.normalize(),f.push(l.x,l.y,l.z),o.
x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function p(){for(let v=1;v<=e;v++)for(let x=1;x<=i;x++){let P=(i+1)*(v-1)+(x-1),T=(i+1)*v+(x-1),C=(i+1)*v+x,R=(i+1)*(v-1)+x;m.push(P,T,R),m.push(T,C,R)}}function y(){for(let v=0;v<=e;v++)for(let x=0;x<=i;x++)c.x=v/e,c.y=x/i,d.push(c.x,c.y)}}copy(t){
return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new s(new tl[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},ml=class extends Ft{constructor(t=null){
if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){let e=[],n=new Set,i=new A,r=new A;if(t.index!==null){let a=t.attributes.position,o=t.index,l=t.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let u=l[c],f=u.start,d=u.
count;for(let m=f,_=f+d;m<_;m+=3)for(let g=0;g<3;g++){let p=o.getX(m+g),y=o.getX(m+(g+1)%3);i.fromBufferAttribute(a,p),r.fromBufferAttribute(a,y),ud(i,r,n)===!0&&(e.push(i.x,i.y,i.z),e.push(r.x,r.y,r.z))}}}else{let a=t.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*
o+c,u=3*o+(c+1)%3;i.fromBufferAttribute(a,h),r.fromBufferAttribute(a,u),ud(i,r,n)===!0&&(e.push(i.x,i.y,i.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new gt(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};function ud(s,t,e){let n=`${s.x},${s.y},${s.
z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${s.x},${s.y},${s.z}`;return e.has(n)===!0||e.has(i)===!0?!1:(e.add(n),e.add(i),!0)}var fd=Object.freeze({__proto__:null,BoxGeometry:ki,CapsuleGeometry:nl,CircleGeometry:il,ConeGeometry:sl,CylinderGeometry:Ls,DodecahedronGeometry:rl,EdgesGeometry:al,ExtrudeGeometry:ol,
IcosahedronGeometry:ll,LatheGeometry:Br,OctahedronGeometry:Hr,PlaneGeometry:Is,PolyhedronGeometry:ui,RingGeometry:cl,ShapeGeometry:hl,SphereGeometry:Gr,TetrahedronGeometry:ul,TorusGeometry:fl,TorusKnotGeometry:dl,TubeGeometry:pl,WireframeGeometry:ml}),gl=class extends we{static get type(){return"Sha\
dowMaterial"}constructor(t){super(),this.isShadowMaterial=!0,this.color=new ot(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}},Us=class extends ge{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.
isRawShaderMaterial=!0}},Wr=class extends we{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=
null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fi,this.normalScale=new X(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,
this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $e,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines=
{STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=
t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=
t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=
t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},_l=class extends Wr{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=
null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new X(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return pe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=
null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ot(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.
attenuationColor=new ot(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ot(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this.
_anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,
this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this.
_transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.
clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,
this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=
t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=
t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}},xl=class extends we{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new ot(16777215),this.specular=new ot(1118481),this.shininess=
30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fi,this.normalScale=new X(1,1),this.displacementMap=null,
this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $e,this.combine=Kr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",
this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,
this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=
t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,
this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},vl=class extends we{static get type(){return"MeshToonMaterial"}constructor(t){super(),this.isMeshToonMaterial=!0,this.
defines={TOON:""},this.color=new ot(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=
fi,this.normalScale=new X(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.
copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=
t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.
wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},yl=class extends we{static get type(){return"MeshNormalMaterial"}constructor(t){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.
bumpScale=1,this.normalMap=null,this.normalMapType=fi,this.normalScale=new X(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=
t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,
this.flatShading=t.flatShading,this}},Ml=class extends we{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(
0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fi,this.normalScale=new X(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=
new $e,this.combine=Kr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=
t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=
t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.
combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Sl=class extends we{static get type(){
return"MeshMatcapMaterial"}constructor(t){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.color=new ot(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fi,this.normalScale=new X(1,1),this.displacementMap=null,this.displacementScale=
1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=
t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.flatShading=t.flatShading,this.fog=t.fog,this}},bl=class extends Re{static get type(){return"L\
ineDashedMaterial"}constructor(t){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}};function Li(s,t,e){return!s||!e&&s.constructor===t?s:typeof t.BYTES_PER_ELEMENT==
"number"?new t(s):Array.prototype.slice.call(s)}function Up(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Np(s){function t(i,r){return s[i]-s[r]}let e=s.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function Ih(s,t,e){let n=s.length,i=new s.constructor(n);
for(let r=0,a=0;a!==n;++r){let o=e[r]*t;for(let l=0;l!==t;++l)i[a++]=s[o+l]}return i}function zu(s,t,e,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(t.push(r.time),e.push.apply(e,a)),r=s[i++];while(r!==
void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(t.push(r.time),a.toArray(e,e.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(t.push(r.time),e.push(a)),r=s[i++];while(r!==void 0)}function Ay(s,t,e,n,i=30){let r=s.clone();r.name=t;let a=[];for(let l=0;l<r.tracks.length;++l){let c=r.
tracks[l],h=c.getValueSize(),u=[],f=[];for(let d=0;d<c.times.length;++d){let m=c.times[d]*i;if(!(m<e||m>=n)){u.push(c.times[d]);for(let _=0;_<h;++_)f.push(c.values[d*h+_])}}u.length!==0&&(c.times=Li(u,c.times.constructor),c.values=Li(f,c.values.constructor),a.push(c))}r.tracks=a;let o=1/0;for(let l=0;l<
r.tracks.length;++l)o>r.tracks[l].times[0]&&(o=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*o);return r.resetDuration(),r}function Cy(s,t=0,e=s,n=30){n<=0&&(n=30);let i=e.tracks.length,r=t/n;for(let a=0;a<i;++a){let o=e.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="\
string")continue;let c=s.tracks.find(function(p){return p.name===o.name&&p.ValueTypeName===l});if(c===void 0)continue;let h=0,u=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let f=0,d=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&
(f=d/3);let m=o.times.length-1,_;if(r<=o.times[0]){let p=h,y=u-h;_=o.values.slice(p,y)}else if(r>=o.times[m]){let p=m*u+h,y=p+u-h;_=o.values.slice(p,y)}else{let p=o.createInterpolant(),y=h,v=u-h;p.evaluate(r),_=p.resultBuffer.slice(y,v)}l==="quaternion"&&new Ue().fromArray(_).normalize().conjugate().
toArray(_);let g=c.times.length;for(let p=0;p<g;++p){let y=p*d+f;if(l==="quaternion")Ue.multiplyQuaternionsFlat(c.values,y,_,0,c.values,y);else{let v=d-f*2;for(let x=0;x<v;++x)c.values[y+x]-=_[x]}}}return s.blendMode=Uu,s}var Ry={convertArray:Li,isTypedArray:Up,getKeyframeOrder:Np,sortedArray:Ih,flattenJSON:zu,
subclip:Ay,makeClipAdditive:Cy},qi=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,
i=e[n],r=e[n-1];t:{e:{let a;n:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break e}a=e.length;break n}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=
0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break e}a=n,n=0;break n}break t}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}
this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error(
"call to abstract method")}intervalChanged_(){}},El=class extends qi{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pi,endingEnd:Pi}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,a=t+
1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Di:r=t,o=2*e-n;break;case vr:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Di:a=t,l=2*n-e;break;case vr:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.
valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,m=(n-e)/(i-e),_=m*m,g=_*m,p=-f*
g+2*f*_-f*m,y=(1+f)*g+(-1.5-2*f)*_+(-.5+f)*m+1,v=(-1-d)*g+(1.5+d)*_+.5*m,x=d*g-d*_;for(let P=0;P!==o;++P)r[P]=p*a[h+P]+y*a[c+P]+v*a[l+P]+x*a[u+P];return r}},Xr=class extends qi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*
o,c=l-o,h=(n-e)/(i-e),u=1-h;for(let f=0;f!==o;++f)r[f]=a[c+f]*u+a[l+f]*h;return r}},Tl=class extends qi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Qe=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");
if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Li(e,this.TimeBufferType),this.values=Li(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)
n=e.toJSON(t);else{n={name:t.name,times:Li(t.times,Array),values:Li(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Tl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){
return new Xr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new El(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case xr:e=this.InterpolantFactoryMethodDiscrete;break;case Po:e=this.InterpolantFactoryMethodLinear;break;case Za:
e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.
warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xr;case this.InterpolantFactoryMethodLinear:return Po;case this.InterpolantFactoryMethodSmooth:return Za}}getValueSize(){return this.
values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>
e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);
let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.
error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&Up(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.
slice(),n=this.getValueSize(),i=this.getInterpolation()===Za,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let u=o*n,f=u-n,d=u+n;for(let m=0;m!==n;++m){let _=e[u+m];if(_!==e[f+m]||_!==e[d+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*n,
f=a*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(
this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};Qe.prototype.TimeBufferType=Float32Array;Qe.prototype.ValueBufferType=Float32Array;Qe.prototype.DefaultInterpolation=Po;var Yn=class extends Qe{constructor(t,e,n){super(t,e,n)}};Yn.prototype.ValueTypeName="bool";Yn.prototype.ValueBufferType=
Array;Yn.prototype.DefaultInterpolation=xr;Yn.prototype.InterpolantFactoryMethodLinear=void 0;Yn.prototype.InterpolantFactoryMethodSmooth=void 0;var qr=class extends Qe{};qr.prototype.ValueTypeName="color";var Yi=class extends Qe{};Yi.prototype.ValueTypeName="number";var wl=class extends qi{constructor(t,e,n,i){
super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)Ue.slerpFlat(r,0,a,c-o,a,c,l);return r}},Zi=class extends Qe{InterpolantFactoryMethodLinear(t){return new wl(this.times,this.values,this.getValueSize(),t)}};
Zi.prototype.ValueTypeName="quaternion";Zi.prototype.InterpolantFactoryMethodSmooth=void 0;var Zn=class extends Qe{constructor(t,e,n){super(t,e,n)}};Zn.prototype.ValueTypeName="string";Zn.prototype.ValueBufferType=Array;Zn.prototype.DefaultInterpolation=xr;Zn.prototype.InterpolantFactoryMethodLinear=
void 0;Zn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ji=class extends Qe{};Ji.prototype.ValueTypeName="vector";var $i=class{constructor(t="",e=-1,n=[],i=ec){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=Je(),this.duration<0&&this.resetDuration()}static parse(t){let e=[],
n=t.tracks,i=1/(t.fps||1);for(let a=0,o=n.length;a!==o;++a)e.push(Py(n[a]).scale(i));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){let e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,a=n.length;r!==a;++r)
e.push(Qe.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(t,e,n,i){let r=e.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=Np(l);l=Ih(l,1,h),c=Ih(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Yi(".morphTargetInfluences["+e[o].name+
"]",l,c).scale(1/n))}return new this(t,-1,a)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let i={},r=/^([\w-]*?)([\d]+)$/;
for(let o=0,l=t.length;o<l;o++){let c=t[o],h=c.name.match(r);if(h&&h.length>1){let u=h[1],f=i[u];f||(i[u]=f=[]),f.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],e,n));return a}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation \
in JSONLoader data."),null;let n=function(u,f,d,m,_){if(d.length!==0){let g=[],p=[];zu(d,g,p,m),g.length!==0&&_.push(new u(f,g,p))}},i=[],r=t.name||"default",a=t.fps||30,o=t.blendMode,l=t.length||-1,c=t.hierarchy||[];for(let u=0;u<c.length;u++){let f=c[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){
let d={},m;for(m=0;m<f.length;m++)if(f[m].morphTargets)for(let _=0;_<f[m].morphTargets.length;_++)d[f[m].morphTargets[_]]=-1;for(let _ in d){let g=[],p=[];for(let y=0;y!==f[m].morphTargets.length;++y){let v=f[m];g.push(v.time),p.push(v.morphTarget===_?1:0)}i.push(new Yi(".morphTargetInfluence["+_+"]",
g,p))}l=d.length*a}else{let d=".bones["+e[u].name+"]";n(Ji,d+".position",f,"pos",i),n(Zi,d+".quaternion",f,"rot",i),n(Ji,d+".scale",f,"scl",i)}}return i.length===0?null:new this(r,l,i,o)}resetDuration(){let t=this.tracks,e=0;for(let n=0,i=t.length;n!==i;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.
times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();
return this}clone(){let t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function Iy(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"num\
ber":case"integer":return Yi;case"vector":case"vector2":case"vector3":case"vector4":return Ji;case"color":return qr;case"quaternion":return Zi;case"bool":case"boolean":return Yn;case"string":return Zn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Py(s){if(s.type===void 0)
throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=Iy(s.type);if(s.times===void 0){let e=[],n=[];zu(s.keys,e,n,"value"),s.times=e,s.values=n}return t.parse!==void 0?t.parse(s):new t(s.name,s.times,s.values,s.interpolation)}var zn={enabled:!1,files:{},add:function(s,t){
this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},Yr=class{constructor(t,e,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.
itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},
this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let d=c[u],m=c[u+1];if(d.global&&(d.lastIndex=0),d.
test(h))return m}return null}}},Fp=new Yr,Ne=class{constructor(t){this.manager=t!==void 0?t:Fp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){
return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Ne.DEFAULT_MATERIAL_NAME="__DEFAULT";var Nn={},Ph=class extends Error{constructor(t,e){
super(t),this.response=e}},gn=class extends Ne{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=zn.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(Nn[t]!==void 0){
Nn[t].push({onLoad:e,onProgress:n,onError:i});return}Nn[t]=[],Nn[t].push({onLoad:e,onProgress:n,onError:i});let a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||
c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Nn[t],u=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,m=d!==0,_=0,g=new ReadableStream(
{start(p){y();function y(){u.read().then(({done:v,value:x})=>{if(v)p.close();else{_+=x.byteLength;let P=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:d});for(let T=0,C=h.length;T<C;T++){let R=h[T];R.onProgress&&R.onProgress(P)}p.enqueue(x),y()}},v=>{p.error(v)})}}});return new Response(
g)}else throw new Ph(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)
return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(m=>d.decode(m))}}}).then(c=>{zn.add(t,c);let h=Nn[t];delete Nn[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{let h=Nn[t];if(h===
void 0)throw this.manager.itemError(t),c;delete Nn[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=
t,this}},Dh=class extends Ne{constructor(t){super(t)}load(t,e,n,i){let r=this,a=new gn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(o){try{e(r.parse(JSON.parse(o)))}catch(l){i?i(l):console.error(l),r.manager.itemError(
t)}},n,i)}parse(t){let e=[];for(let n=0;n<t.length;n++){let i=$i.parse(t[n]);e.push(i)}return e}},Lh=class extends Ne{constructor(t){super(t)}load(t,e,n,i){let r=this,a=[],o=new Ps,l=new gn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(
r.withCredentials);let c=0;function h(u){l.load(t[u],function(f){let d=r.parse(f,!0);a[u]={width:d.width,height:d.height,format:d.format,mipmaps:d.mipmaps},c+=1,c===6&&(d.mipmapCount===1&&(o.minFilter=ye),o.image=a,o.format=d.format,o.needsUpdate=!0,e&&e(o))},n,i)}if(Array.isArray(t))for(let u=0,f=t.
length;u<f;++u)h(u);else l.load(t,function(u){let f=r.parse(u,!0);if(f.isCubemap){let d=f.mipmaps.length/f.mipmapCount;for(let m=0;m<d;m++){a[m]={mipmaps:[]};for(let _=0;_<f.mipmapCount;_++)a[m].mipmaps.push(f.mipmaps[m*f.mipmapCount+_]),a[m].format=f.format,a[m].width=f.width,a[m].height=f.height}o.
image=a}else o.image.width=f.width,o.image.height=f.height,o.mipmaps=f.mipmaps;f.mipmapCount===1&&(o.minFilter=ye),o.format=f.format,o.needsUpdate=!0,e&&e(o)},n,i);return o}},Ki=class extends Ne{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,
a=zn.get(t);if(a!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;let o=Sr("img");function l(){h(),zn.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(u){h(),i&&i(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("l\
oad",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}},Uh=class extends Ne{constructor(t){super(t)}load(t,e,n,i){let r=new Vi;
r.colorSpace=We;let a=new Ki(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);let o=0;function l(c){a.load(t[c],function(h){r.images[c]=h,o++,o===6&&(r.needsUpdate=!0,e&&e(r))},void 0,i)}for(let c=0;c<t.length;++c)l(c);return r}},Nh=class extends Ne{constructor(t){super(t)}load(t,e,n,i){
let r=this,a=new sn,o=new gn(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(t,function(l){let c;try{c=r.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?
a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:nn,a.wrapT=c.wrapT!==void 0?c.wrapT:nn,a.magFilter=c.magFilter!==void 0?c.magFilter:ye,a.minFilter=c.minFilter!==void 0?c.minFilter:ye,a.anisotropy=c.anisotropy!==void 0?
c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=Sn),c.mipmapCount===1&&(a.minFilter=ye),c.generateMipmaps!==void 0&&(a.generateMipmaps=
c.generateMipmaps),a.needsUpdate=!0,e&&e(a,c)},n,i),a}},Fh=class extends Ne{constructor(t){super(t)}load(t,e,n,i){let r=new xe,a=new Ki(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}},An=class extends te{constructor(t,e=1){
super(),this.isLight=!0,this.type="Light",this.color=new ot(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==
void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.
shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Al=class extends An{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ot(e)}copy(t,e){return super.copy(
t,e),this.groundColor.copy(t.groundColor),this}},Yc=new Ut,dd=new A,pd=new A,Zr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new X(512,512),this.map=null,this.mapPass=null,this.matrix=new Ut,this.autoUpdate=!0,this.needsUpdate=
!1,this._frustum=new Hi,this._frameExtents=new X(1,1),this._viewportCount=1,this._viewports=[new $t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;dd.setFromMatrixPosition(t.matrixWorld),e.position.copy(dd),
pd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(pd),e.updateMatrixWorld(),Yc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Yc)}getViewport(t){return this._viewports[t]}getFrameExtents(){
return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){
let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(
!1).object,delete t.camera.matrix,t}},Oh=class extends Zr{constructor(){super(new ve(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,n=Ts*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.
fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},Cl=class extends An{constructor(t,e,n=0,i=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(te.DEFAULT_UP),this.updateMatrix(),
this.target=new te,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Oh}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.
penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},md=new Ut,js=new A,Zc=new A,Bh=class extends Zr{constructor(){super(new ve(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new X(4,2),this._viewportCount=6,this._viewports=[new $t(2,1,
1,1),new $t(0,1,1,1),new $t(3,1,1,1),new $t(1,1,1,1),new $t(3,0,1,1),new $t(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(t,e=0){
let n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),js.setFromMatrixPosition(t.matrixWorld),n.position.copy(js),Zc.copy(n.position),Zc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Zc),n.updateMatrixWorld(),i.makeTranslation(-js.x,-js.
y,-js.z),md.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(md)}},Rl=class extends An{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Bh}get power(){return this.intensity*4*Math.
PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},zh=class extends Zr{constructor(){super(new ci(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Il=class extends An{constructor(t,e){
super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(te.DEFAULT_UP),this.updateMatrix(),this.target=new te,this.shadow=new zh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Pl=class extends An{constructor(t,e){
super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}},Dl=class extends An{constructor(t,e,n=10,i=10){super(t,e),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(t){this.intensity=t/(this.width*
this.height*Math.PI)}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){let e=super.toJSON(t);return e.object.width=this.width,e.object.height=this.height,e}},Ll=class{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let t=0;t<9;t++)this.coefficients.
push(new A)}set(t){for(let e=0;e<9;e++)this.coefficients[e].copy(t[e]);return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0);return this}getAt(t,e){let n=t.x,i=t.y,r=t.z,a=this.coefficients;return e.copy(a[0]).multiplyScalar(.282095),e.addScaledVector(a[1],.488603*i),e.addScaledVector(
a[2],.488603*r),e.addScaledVector(a[3],.488603*n),e.addScaledVector(a[4],1.092548*(n*i)),e.addScaledVector(a[5],1.092548*(i*r)),e.addScaledVector(a[6],.315392*(3*r*r-1)),e.addScaledVector(a[7],1.092548*(n*r)),e.addScaledVector(a[8],.546274*(n*n-i*i)),e}getIrradianceAt(t,e){let n=t.x,i=t.y,r=t.z,a=this.
coefficients;return e.copy(a[0]).multiplyScalar(.886227),e.addScaledVector(a[1],2*.511664*i),e.addScaledVector(a[2],2*.511664*r),e.addScaledVector(a[3],2*.511664*n),e.addScaledVector(a[4],2*.429043*n*i),e.addScaledVector(a[5],2*.429043*i*r),e.addScaledVector(a[6],.743125*r*r-.247708),e.addScaledVector(
a[7],2*.429043*n*r),e.addScaledVector(a[8],.429043*(n*n-i*i)),e}add(t){for(let e=0;e<9;e++)this.coefficients[e].add(t.coefficients[e]);return this}addScaledSH(t,e){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(t.coefficients[n],e);return this}scale(t){for(let e=0;e<9;e++)this.coefficients[e].
multiplyScalar(t);return this}lerp(t,e){for(let n=0;n<9;n++)this.coefficients[n].lerp(t.coefficients[n],e);return this}equals(t){for(let e=0;e<9;e++)if(!this.coefficients[e].equals(t.coefficients[e]))return!1;return!0}copy(t){return this.set(t.coefficients)}clone(){return new this.constructor().copy(
this)}fromArray(t,e=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(t,e+i*3);return this}toArray(t=[],e=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(t,e+i*3);return t}static getBasisAt(t,e){let n=t.x,i=t.y,r=t.z;e[0]=.282095,e[1]=.488603*i,e[2]=.488603*r,e[3]=.488603*n,e[4]=
1.092548*n*i,e[5]=1.092548*i*r,e[6]=.315392*(3*r*r-1),e[7]=1.092548*n*r,e[8]=.546274*(n*n-i*i)}},Ul=class extends An{constructor(t=new Ll,e=1){super(void 0,e),this.isLightProbe=!0,this.sh=t}copy(t){return super.copy(t),this.sh.copy(t.sh),this}fromJSON(t){return this.intensity=t.intensity,this.sh.fromArray(
t.sh),this}toJSON(t){let e=super.toJSON(t);return e.object.sh=this.sh.toArray(),e}},Nl=class s extends Ne{constructor(t){super(t),this.textures={}}load(t,e,n,i){let r=this,a=new gn(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(t,function(o){
try{e(r.parse(JSON.parse(o)))}catch(l){i?i(l):console.error(l),r.manager.itemError(t)}},n,i)}parse(t){let e=this.textures;function n(r){return e[r]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",r),e[r]}let i=this.createMaterialFromType(t.type);if(t.uuid!==void 0&&(i.uuid=t.uuid),t.
name!==void 0&&(i.name=t.name),t.color!==void 0&&i.color!==void 0&&i.color.setHex(t.color),t.roughness!==void 0&&(i.roughness=t.roughness),t.metalness!==void 0&&(i.metalness=t.metalness),t.sheen!==void 0&&(i.sheen=t.sheen),t.sheenColor!==void 0&&(i.sheenColor=new ot().setHex(t.sheenColor)),t.sheenRoughness!==
void 0&&(i.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(t.emissive),t.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(t.specular),t.specularIntensity!==void 0&&(i.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&i.specularColor!==
void 0&&i.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(i.shininess=t.shininess),t.clearcoat!==void 0&&(i.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(i.dispersion=t.dispersion),t.iridescence!==void 0&&(i.iridescence=
t.iridescence),t.iridescenceIOR!==void 0&&(i.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(i.transmission=t.transmission),t.thickness!==void 0&&(i.thickness=t.thickness),t.attenuationDistance!==
void 0&&(i.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(i.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&
(i.fog=t.fog),t.flatShading!==void 0&&(i.flatShading=t.flatShading),t.blending!==void 0&&(i.blending=t.blending),t.combine!==void 0&&(i.combine=t.combine),t.side!==void 0&&(i.side=t.side),t.shadowSide!==void 0&&(i.shadowSide=t.shadowSide),t.opacity!==void 0&&(i.opacity=t.opacity),t.transparent!==void 0&&
(i.transparent=t.transparent),t.alphaTest!==void 0&&(i.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(i.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(i.depthFunc=t.depthFunc),t.depthTest!==void 0&&(i.depthTest=t.depthTest),t.depthWrite!==void 0&&(i.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(i.colorWrite=
t.colorWrite),t.blendSrc!==void 0&&(i.blendSrc=t.blendSrc),t.blendDst!==void 0&&(i.blendDst=t.blendDst),t.blendEquation!==void 0&&(i.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(i.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==
void 0&&(i.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(i.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(i.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(i.stencilFunc=t.stencilFunc),
t.stencilRef!==void 0&&(i.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(i.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(i.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(i.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(i.stencilZPass=t.stencilZPass),t.stencilWrite!==
void 0&&(i.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(i.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(i.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=t.wireframeLinejoin),
t.rotation!==void 0&&(i.rotation=t.rotation),t.linewidth!==void 0&&(i.linewidth=t.linewidth),t.dashSize!==void 0&&(i.dashSize=t.dashSize),t.gapSize!==void 0&&(i.gapSize=t.gapSize),t.scale!==void 0&&(i.scale=t.scale),t.polygonOffset!==void 0&&(i.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==
void 0&&(i.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(i.dithering=t.dithering),t.alphaToCoverage!==void 0&&(i.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=t.premultipliedAlpha),
t.forceSinglePass!==void 0&&(i.forceSinglePass=t.forceSinglePass),t.visible!==void 0&&(i.visible=t.visible),t.toneMapped!==void 0&&(i.toneMapped=t.toneMapped),t.userData!==void 0&&(i.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?i.vertexColors=t.vertexColors>0:i.vertexColors=
t.vertexColors),t.uniforms!==void 0)for(let r in t.uniforms){let a=t.uniforms[r];switch(i.uniforms[r]={},a.type){case"t":i.uniforms[r].value=n(a.value);break;case"c":i.uniforms[r].value=new ot().setHex(a.value);break;case"v2":i.uniforms[r].value=new X().fromArray(a.value);break;case"v3":i.uniforms[r].
value=new A().fromArray(a.value);break;case"v4":i.uniforms[r].value=new $t().fromArray(a.value);break;case"m3":i.uniforms[r].value=new zt().fromArray(a.value);break;case"m4":i.uniforms[r].value=new Ut().fromArray(a.value);break;default:i.uniforms[r].value=a.value}}if(t.defines!==void 0&&(i.defines=t.
defines),t.vertexShader!==void 0&&(i.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(i.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(i.glslVersion=t.glslVersion),t.extensions!==void 0)for(let r in t.extensions)i.extensions[r]=t.extensions[r];if(t.lights!==void 0&&(i.lights=t.lights),
t.clipping!==void 0&&(i.clipping=t.clipping),t.size!==void 0&&(i.size=t.size),t.sizeAttenuation!==void 0&&(i.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(i.map=n(t.map)),t.matcap!==void 0&&(i.matcap=n(t.matcap)),t.alphaMap!==void 0&&(i.alphaMap=n(t.alphaMap)),t.bumpMap!==void 0&&(i.bumpMap=n(
t.bumpMap)),t.bumpScale!==void 0&&(i.bumpScale=t.bumpScale),t.normalMap!==void 0&&(i.normalMap=n(t.normalMap)),t.normalMapType!==void 0&&(i.normalMapType=t.normalMapType),t.normalScale!==void 0){let r=t.normalScale;Array.isArray(r)===!1&&(r=[r,r]),i.normalScale=new X().fromArray(r)}return t.displacementMap!==
void 0&&(i.displacementMap=n(t.displacementMap)),t.displacementScale!==void 0&&(i.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(i.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(i.roughnessMap=n(t.roughnessMap)),t.metalnessMap!==void 0&&(i.metalnessMap=n(t.metalnessMap)),
t.emissiveMap!==void 0&&(i.emissiveMap=n(t.emissiveMap)),t.emissiveIntensity!==void 0&&(i.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(i.specularMap=n(t.specularMap)),t.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(t.specularIntensityMap)),t.specularColorMap!==void 0&&(i.
specularColorMap=n(t.specularColorMap)),t.envMap!==void 0&&(i.envMap=n(t.envMap)),t.envMapRotation!==void 0&&i.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(i.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(i.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&
(i.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(i.lightMap=n(t.lightMap)),t.lightMapIntensity!==void 0&&(i.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(i.aoMap=n(t.aoMap)),t.aoMapIntensity!==void 0&&(i.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(i.gradientMap=n(
t.gradientMap)),t.clearcoatMap!==void 0&&(i.clearcoatMap=n(t.clearcoatMap)),t.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(t.clearcoatRoughnessMap)),t.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(t.clearcoatNormalMap)),t.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new X().
fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(i.iridescenceMap=n(t.iridescenceMap)),t.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(t.iridescenceThicknessMap)),t.transmissionMap!==void 0&&(i.transmissionMap=n(t.transmissionMap)),t.thicknessMap!==void 0&&(i.thicknessMap=
n(t.thicknessMap)),t.anisotropyMap!==void 0&&(i.anisotropyMap=n(t.anisotropyMap)),t.sheenColorMap!==void 0&&(i.sheenColorMap=n(t.sheenColorMap)),t.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(t.sheenRoughnessMap)),i}setTextures(t){return this.textures=t,this}createMaterialFromType(t){return s.
createMaterialFromType(t)}static createMaterialFromType(t){let e={ShadowMaterial:gl,SpriteMaterial:Ir,RawShaderMaterial:Us,ShaderMaterial:ge,PointsMaterial:Dr,MeshPhysicalMaterial:_l,MeshStandardMaterial:Wr,MeshPhongMaterial:xl,MeshToonMaterial:vl,MeshNormalMaterial:yl,MeshLambertMaterial:Ml,MeshDepthMaterial:Cr,
MeshDistanceMaterial:Rr,MeshBasicMaterial:an,MeshMatcapMaterial:Sl,LineDashedMaterial:bl,LineBasicMaterial:Re,Material:we};return new e[t]}},Jr=class{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder ins\
tead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!=
"string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}},Fl=class extends Ft{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",
this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}},Ol=class extends Ne{constructor(t){super(t)}load(t,e,n,i){let r=this,a=new gn(r.manager);a.setPath(r.
path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(t,function(o){try{e(r.parse(JSON.parse(o)))}catch(l){i?i(l):console.error(l),r.manager.itemError(t)}},n,i)}parse(t){let e={},n={};function i(d,m){if(e[m]!==void 0)return e[m];let g=d.interleavedBuffers[m],p=r(d,
g.buffer),y=vs(g.type,p),v=new Gi(y,g.stride);return v.uuid=g.uuid,e[m]=v,v}function r(d,m){if(n[m]!==void 0)return n[m];let g=d.arrayBuffers[m],p=new Uint32Array(g).buffer;return n[m]=p,p}let a=t.isInstancedBufferGeometry?new Fl:new Ft,o=t.data.index;if(o!==void 0){let d=vs(o.type,o.array);a.setIndex(
new Qt(d,1))}let l=t.data.attributes;for(let d in l){let m=l[d],_;if(m.isInterleavedBufferAttribute){let g=i(t.data,m.data);_=new hi(g,m.itemSize,m.offset,m.normalized)}else{let g=vs(m.type,m.array),p=m.isInstancedBufferAttribute?qn:Qt;_=new p(g,m.itemSize,m.normalized)}m.name!==void 0&&(_.name=m.name),
m.usage!==void 0&&_.setUsage(m.usage),a.setAttribute(d,_)}let c=t.data.morphAttributes;if(c)for(let d in c){let m=c[d],_=[];for(let g=0,p=m.length;g<p;g++){let y=m[g],v;if(y.isInterleavedBufferAttribute){let x=i(t.data,y.data);v=new hi(x,y.itemSize,y.offset,y.normalized)}else{let x=vs(y.type,y.array);
v=new Qt(x,y.itemSize,y.normalized)}y.name!==void 0&&(v.name=y.name),_.push(v)}a.morphAttributes[d]=_}t.data.morphTargetsRelative&&(a.morphTargetsRelative=!0);let u=t.data.groups||t.data.drawcalls||t.data.offsets;if(u!==void 0)for(let d=0,m=u.length;d!==m;++d){let _=u[d];a.addGroup(_.start,_.count,_.
materialIndex)}let f=t.data.boundingSphere;if(f!==void 0){let d=new A;f.center!==void 0&&d.fromArray(f.center),a.boundingSphere=new Te(d,f.radius)}return t.name&&(a.name=t.name),t.userData&&(a.userData=t.userData),a}},kh=class extends Ne{constructor(t){super(t)}load(t,e,n,i){let r=this,a=this.path===
""?Jr.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||a;let o=new gn(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(l){let c=null;try{c=JSON.parse(l)}catch(u){i!==void 0&&i(u),console.error("THRE\
E:ObjectLoader: Can't parse "+t+".",u.message);return}let h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+t)),console.error("THREE.ObjectLoader: Can't load "+t);return}r.parse(c,e)},n,i)}async loadAsync(t,e){let n=this,
i=this.path===""?Jr.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||i;let r=new gn(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);let a=await r.loadAsync(t,e),o=JSON.parse(a),l=o.metadata;if(l===void 0||l.type===void 0||
l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+t);return await n.parseAsync(o)}parse(t,e){let n=this.parseAnimations(t.animations),i=this.parseShapes(t.shapes),r=this.parseGeometries(t.geometries,i),a=this.parseImages(t.images,function(){e!==void 0&&e(c)}),o=this.
parseTextures(t.textures,a),l=this.parseMaterials(t.materials,o),c=this.parseObject(t.object,r,l,o,n),h=this.parseSkeletons(t.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),e!==void 0){let u=!1;for(let f in a)if(a[f].data instanceof HTMLImageElement){u=!0;break}u===!1&&e(c)}return c}async parseAsync(t){
let e=this.parseAnimations(t.animations),n=this.parseShapes(t.shapes),i=this.parseGeometries(t.geometries,n),r=await this.parseImagesAsync(t.images),a=this.parseTextures(t.textures,r),o=this.parseMaterials(t.materials,a),l=this.parseObject(t.object,i,o,a,e),c=this.parseSkeletons(t.skeletons,l);return this.
bindSkeletons(l,c),this.bindLightTargets(l),l}parseShapes(t){let e={};if(t!==void 0)for(let n=0,i=t.length;n<i;n++){let r=new Hn().fromJSON(t[n]);e[r.uuid]=r}return e}parseSkeletons(t,e){let n={},i={};if(e.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),t!==void 0)for(let r=0,a=t.length;r<a;r++){let o=new Go().
fromJSON(t[r],i);n[o.uuid]=o}return n}parseGeometries(t,e){let n={};if(t!==void 0){let i=new Ol;for(let r=0,a=t.length;r<a;r++){let o,l=t[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":o=i.parse(l);break;default:l.type in fd?o=fd[l.type].fromJSON(l,e):console.warn(`THREE.Object\
Loader: Unsupported geometry type "${l.type}"`)}o.uuid=l.uuid,l.name!==void 0&&(o.name=l.name),l.userData!==void 0&&(o.userData=l.userData),n[l.uuid]=o}}return n}parseMaterials(t,e){let n={},i={};if(t!==void 0){let r=new Nl;r.setTextures(e);for(let a=0,o=t.length;a<o;a++){let l=t[a];n[l.uuid]===void 0&&
(n[l.uuid]=r.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(t){let e={};if(t!==void 0)for(let n=0;n<t.length;n++){let i=t[n],r=$i.parse(i);e[r.uuid]=r}return e}parseImages(t,e){let n=this,i={},r;function a(l){return n.manager.itemStart(l),r.load(l,function(){n.manager.itemEnd(l)},void 0,function(){
n.manager.itemError(l),n.manager.itemEnd(l)})}function o(l){if(typeof l=="string"){let c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return a(h)}else return l.data?{data:vs(l.type,l.data),width:l.width,height:l.height}:null}if(t!==void 0&&t.length>0){let l=new Yr(e);r=new Ki(l),r.setCrossOrigin(
this.crossOrigin);for(let c=0,h=t.length;c<h;c++){let u=t[c],f=u.url;if(Array.isArray(f)){let d=[];for(let m=0,_=f.length;m<_;m++){let g=f[m],p=o(g);p!==null&&(p instanceof HTMLImageElement?d.push(p):d.push(new sn(p.data,p.width,p.height)))}i[u.uuid]=new Bn(d)}else{let d=o(u.url);i[u.uuid]=new Bn(d)}}}
return i}async parseImagesAsync(t){let e=this,n={},i;async function r(a){if(typeof a=="string"){let o=a,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(o)?o:e.resourcePath+o;return await i.loadAsync(l)}else return a.data?{data:vs(a.type,a.data),width:a.width,height:a.height}:null}if(t!==void 0&&t.length>0){i=new Ki(
this.manager),i.setCrossOrigin(this.crossOrigin);for(let a=0,o=t.length;a<o;a++){let l=t[a],c=l.url;if(Array.isArray(c)){let h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u],m=await r(d);m!==null&&(m instanceof HTMLImageElement?h.push(m):h.push(new sn(m.data,m.width,m.height)))}n[l.uuid]=new Bn(h)}else{
let h=await r(l.url);n[l.uuid]=new Bn(h)}}}return n}parseTextures(t,e){function n(r,a){return typeof r=="number"?r:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",r),a[r])}let i={};if(t!==void 0)for(let r=0,a=t.length;r<a;r++){let o=t[r];o.image===void 0&&console.
warn('THREE.ObjectLoader: No "image" specified for',o.uuid),e[o.image]===void 0&&console.warn("THREE.ObjectLoader: Undefined image",o.image);let l=e[o.image],c=l.data,h;Array.isArray(c)?(h=new Vi,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new sn:h=new xe,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=
o.uuid,o.name!==void 0&&(h.name=o.name),o.mapping!==void 0&&(h.mapping=n(o.mapping,Dy)),o.channel!==void 0&&(h.channel=o.channel),o.offset!==void 0&&h.offset.fromArray(o.offset),o.repeat!==void 0&&h.repeat.fromArray(o.repeat),o.center!==void 0&&h.center.fromArray(o.center),o.rotation!==void 0&&(h.rotation=
o.rotation),o.wrap!==void 0&&(h.wrapS=n(o.wrap[0],gd),h.wrapT=n(o.wrap[1],gd)),o.format!==void 0&&(h.format=o.format),o.internalFormat!==void 0&&(h.internalFormat=o.internalFormat),o.type!==void 0&&(h.type=o.type),o.colorSpace!==void 0&&(h.colorSpace=o.colorSpace),o.minFilter!==void 0&&(h.minFilter=
n(o.minFilter,_d)),o.magFilter!==void 0&&(h.magFilter=n(o.magFilter,_d)),o.anisotropy!==void 0&&(h.anisotropy=o.anisotropy),o.flipY!==void 0&&(h.flipY=o.flipY),o.generateMipmaps!==void 0&&(h.generateMipmaps=o.generateMipmaps),o.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=o.premultiplyAlpha),o.unpackAlignment!==
void 0&&(h.unpackAlignment=o.unpackAlignment),o.compareFunction!==void 0&&(h.compareFunction=o.compareFunction),o.userData!==void 0&&(h.userData=o.userData),i[o.uuid]=h}return i}parseObject(t,e,n,i,r){let a;function o(f){return e[f]===void 0&&console.warn("THREE.ObjectLoader: Undefined geometry",f),
e[f]}function l(f){if(f!==void 0){if(Array.isArray(f)){let d=[];for(let m=0,_=f.length;m<_;m++){let g=f[m];n[g]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",g),d.push(n[g])}return d}return n[f]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",f),n[f]}}function c(f){
return i[f]===void 0&&console.warn("THREE.ObjectLoader: Undefined texture",f),i[f]}let h,u;switch(t.type){case"Scene":a=new zo,t.background!==void 0&&(Number.isInteger(t.background)?a.background=new ot(t.background):a.background=c(t.background)),t.environment!==void 0&&(a.environment=c(t.environment)),
t.fog!==void 0&&(t.fog.type==="Fog"?a.fog=new Bo(t.fog.color,t.fog.near,t.fog.far):t.fog.type==="FogExp2"&&(a.fog=new Oo(t.fog.color,t.fog.density)),t.fog.name!==""&&(a.fog.name=t.fog.name)),t.backgroundBlurriness!==void 0&&(a.backgroundBlurriness=t.backgroundBlurriness),t.backgroundIntensity!==void 0&&
(a.backgroundIntensity=t.backgroundIntensity),t.backgroundRotation!==void 0&&a.backgroundRotation.fromArray(t.backgroundRotation),t.environmentIntensity!==void 0&&(a.environmentIntensity=t.environmentIntensity),t.environmentRotation!==void 0&&a.environmentRotation.fromArray(t.environmentRotation);break;case"\
PerspectiveCamera":a=new ve(t.fov,t.aspect,t.near,t.far),t.focus!==void 0&&(a.focus=t.focus),t.zoom!==void 0&&(a.zoom=t.zoom),t.filmGauge!==void 0&&(a.filmGauge=t.filmGauge),t.filmOffset!==void 0&&(a.filmOffset=t.filmOffset),t.view!==void 0&&(a.view=Object.assign({},t.view));break;case"OrthographicC\
amera":a=new ci(t.left,t.right,t.top,t.bottom,t.near,t.far),t.zoom!==void 0&&(a.zoom=t.zoom),t.view!==void 0&&(a.view=Object.assign({},t.view));break;case"AmbientLight":a=new Pl(t.color,t.intensity);break;case"DirectionalLight":a=new Il(t.color,t.intensity),a.target=t.target||"";break;case"PointLigh\
t":a=new Rl(t.color,t.intensity,t.distance,t.decay);break;case"RectAreaLight":a=new Dl(t.color,t.intensity,t.width,t.height);break;case"SpotLight":a=new Cl(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay),a.target=t.target||"";break;case"HemisphereLight":a=new Al(t.color,t.groundColor,t.intensity);
break;case"LightProbe":a=new Ul().fromJSON(t);break;case"SkinnedMesh":h=o(t.geometry),u=l(t.material),a=new Ho(h,u),t.bindMode!==void 0&&(a.bindMode=t.bindMode),t.bindMatrix!==void 0&&a.bindMatrix.fromArray(t.bindMatrix),t.skeleton!==void 0&&(a.skeleton=t.skeleton);break;case"Mesh":h=o(t.geometry),u=
l(t.material),a=new he(h,u);break;case"InstancedMesh":h=o(t.geometry),u=l(t.material);let f=t.count,d=t.instanceMatrix,m=t.instanceColor;a=new Wo(h,u,f),a.instanceMatrix=new qn(new Float32Array(d.array),16),m!==void 0&&(a.instanceColor=new qn(new Float32Array(m.array),m.itemSize));break;case"Batched\
Mesh":h=o(t.geometry),u=l(t.material),a=new Xo(t.maxInstanceCount,t.maxVertexCount,t.maxIndexCount,u),a.geometry=h,a.perObjectFrustumCulled=t.perObjectFrustumCulled,a.sortObjects=t.sortObjects,a._drawRanges=t.drawRanges,a._reservedRanges=t.reservedRanges,a._visibility=t.visibility,a._active=t.active,
a._bounds=t.bounds.map(_=>{let g=new Ce;g.min.fromArray(_.boxMin),g.max.fromArray(_.boxMax);let p=new Te;return p.radius=_.sphereRadius,p.center.fromArray(_.sphereCenter),{boxInitialized:_.boxInitialized,box:g,sphereInitialized:_.sphereInitialized,sphere:p}}),a._maxInstanceCount=t.maxInstanceCount,a.
_maxVertexCount=t.maxVertexCount,a._maxIndexCount=t.maxIndexCount,a._geometryInitialized=t.geometryInitialized,a._geometryCount=t.geometryCount,a._matricesTexture=c(t.matricesTexture.uuid),t.colorsTexture!==void 0&&(a._colorsTexture=c(t.colorsTexture.uuid));break;case"LOD":a=new Vo;break;case"Line":
a=new wn(o(t.geometry),l(t.material));break;case"LineLoop":a=new Zo(o(t.geometry),l(t.material));break;case"LineSegments":a=new on(o(t.geometry),l(t.material));break;case"PointCloud":case"Points":a=new Jo(o(t.geometry),l(t.material));break;case"Sprite":a=new ko(l(t.material));break;case"Group":a=new ai;
break;case"Bone":a=new Pr;break;default:a=new te}if(a.uuid=t.uuid,t.name!==void 0&&(a.name=t.name),t.matrix!==void 0?(a.matrix.fromArray(t.matrix),t.matrixAutoUpdate!==void 0&&(a.matrixAutoUpdate=t.matrixAutoUpdate),a.matrixAutoUpdate&&a.matrix.decompose(a.position,a.quaternion,a.scale)):(t.position!==
void 0&&a.position.fromArray(t.position),t.rotation!==void 0&&a.rotation.fromArray(t.rotation),t.quaternion!==void 0&&a.quaternion.fromArray(t.quaternion),t.scale!==void 0&&a.scale.fromArray(t.scale)),t.up!==void 0&&a.up.fromArray(t.up),t.castShadow!==void 0&&(a.castShadow=t.castShadow),t.receiveShadow!==
void 0&&(a.receiveShadow=t.receiveShadow),t.shadow&&(t.shadow.intensity!==void 0&&(a.shadow.intensity=t.shadow.intensity),t.shadow.bias!==void 0&&(a.shadow.bias=t.shadow.bias),t.shadow.normalBias!==void 0&&(a.shadow.normalBias=t.shadow.normalBias),t.shadow.radius!==void 0&&(a.shadow.radius=t.shadow.
radius),t.shadow.mapSize!==void 0&&a.shadow.mapSize.fromArray(t.shadow.mapSize),t.shadow.camera!==void 0&&(a.shadow.camera=this.parseObject(t.shadow.camera))),t.visible!==void 0&&(a.visible=t.visible),t.frustumCulled!==void 0&&(a.frustumCulled=t.frustumCulled),t.renderOrder!==void 0&&(a.renderOrder=
t.renderOrder),t.userData!==void 0&&(a.userData=t.userData),t.layers!==void 0&&(a.layers.mask=t.layers),t.children!==void 0){let f=t.children;for(let d=0;d<f.length;d++)a.add(this.parseObject(f[d],e,n,i,r))}if(t.animations!==void 0){let f=t.animations;for(let d=0;d<f.length;d++){let m=f[d];a.animations.
push(r[m])}}if(t.type==="LOD"){t.autoUpdate!==void 0&&(a.autoUpdate=t.autoUpdate);let f=t.levels;for(let d=0;d<f.length;d++){let m=f[d],_=a.getObjectByProperty("uuid",m.object);_!==void 0&&a.addLevel(_,m.distance,m.hysteresis)}}return a}bindSkeletons(t,e){Object.keys(e).length!==0&&t.traverse(function(n){
if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){let i=e[n.skeleton];i===void 0?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(t){t.traverse(function(e){if(e.isDirectionalLight||e.isSpotLight){let n=e.target,i=t.getObjectByProperty(
"uuid",n);i!==void 0?e.target=i:e.target=new te}})}},Dy={UVMapping:Zl,CubeReflectionMapping:Wn,CubeRefractionMapping:oi,EquirectangularReflectionMapping:pr,EquirectangularRefractionMapping:mr,CubeUVReflectionMapping:Fs},gd={RepeatWrapping:gr,ClampToEdgeWrapping:nn,MirroredRepeatWrapping:_r},_d={NearestFilter:Ae,
NearestMipmapNearestFilter:Eu,NearestMipmapLinearFilter:xs,LinearFilter:ye,LinearMipmapNearestFilter:ir,LinearMipmapLinearFilter:Sn},Vh=class extends Ne{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not su\
pported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,a=zn.get(t);if(a!==
void 0){if(r.manager.itemStart(t),a.then){a.then(c=>{e&&e(c),r.manager.itemEnd(t)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let l=fetch(t,o).then(
function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return zn.add(t,c),e&&e(c),r.manager.itemEnd(t),c}).catch(function(c){i&&i(c),zn.remove(t),r.manager.itemError(t),r.manager.itemEnd(t)});zn.add(t,l),r.
manager.itemStart(t)}},Va,$r=class{static getContext(){return Va===void 0&&(Va=new(window.AudioContext||window.webkitAudioContext)),Va}static setContext(t){Va=t}},Hh=class extends Ne{constructor(t){super(t)}load(t,e,n,i){let r=this,a=new gn(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.
path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(l){try{let c=l.slice(0);$r.getContext().decodeAudioData(c,function(u){e(u)}).catch(o)}catch(c){o(c)}},n,i);function o(l){i?i(l):console.error(l),r.manager.itemError(t)}}},xd=new Ut,vd=new Ut,bi=new Ut,
Gh=class{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new ve,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new ve,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,
far:null,zoom:null,eyeSep:null}}update(t){let e=this._cache;if(e.focus!==t.focus||e.fov!==t.fov||e.aspect!==t.aspect*this.aspect||e.near!==t.near||e.far!==t.far||e.zoom!==t.zoom||e.eyeSep!==this.eyeSep){e.focus=t.focus,e.fov=t.fov,e.aspect=t.aspect*this.aspect,e.near=t.near,e.far=t.far,e.zoom=t.zoom,
e.eyeSep=this.eyeSep,bi.copy(t.projectionMatrix);let i=e.eyeSep/2,r=i*e.near/e.focus,a=e.near*Math.tan(Fi*e.fov*.5)/e.zoom,o,l;vd.elements[12]=-i,xd.elements[12]=i,o=-a*e.aspect+r,l=a*e.aspect+r,bi.elements[0]=2*e.near/(l-o),bi.elements[8]=(l+o)/(l-o),this.cameraL.projectionMatrix.copy(bi),o=-a*e.aspect-
r,l=a*e.aspect-r,bi.elements[0]=2*e.near/(l-o),bi.elements[8]=(l+o)/(l-o),this.cameraR.projectionMatrix.copy(bi)}this.cameraL.matrixWorld.copy(t.matrixWorld).multiply(vd),this.cameraR.matrixWorld.copy(t.matrixWorld).multiply(xd)}},Ns=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=
0,this.elapsedTime=0,this.running=!1}start(){this.startTime=yd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)
return this.start(),0;if(this.running){let e=yd();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function yd(){return performance.now()}var Ei=new A,Md=new Ue,Ly=new A,Ti=new A,Wh=class extends te{constructor(){super(),this.type="AudioListener",this.context=$r.getContext(),this.
gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Ns}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(
this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.
filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t);let e=this.context.listener,n=this.up;if(this.timeDelta=this._clock.
getDelta(),this.matrixWorld.decompose(Ei,Md,Ly),Ti.set(0,0,-1).applyQuaternion(Md),e.positionX){let i=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(Ei.x,i),e.positionY.linearRampToValueAtTime(Ei.y,i),e.positionZ.linearRampToValueAtTime(Ei.z,i),e.forwardX.linearRampToValueAtTime(
Ti.x,i),e.forwardY.linearRampToValueAtTime(Ti.y,i),e.forwardZ.linearRampToValueAtTime(Ti.z,i),e.upX.linearRampToValueAtTime(n.x,i),e.upY.linearRampToValueAtTime(n.y,i),e.upZ.linearRampToValueAtTime(n.z,i)}else e.setPosition(Ei.x,Ei.y,Ei.z),e.setOrientation(Ti.x,Ti.y,Ti.z,n.x,n.y,n.z)}},Bl=class extends te{constructor(t){
super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.
hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){
return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){
return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.
context.currentTime+t;let e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(
this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.
loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(t=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==
null&&(this.source.stop(this.context.currentTime+t),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(
this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.
filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(t){return t||(t=[]),this._connected===!0?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){
return this.detune=t,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(this.hasPlaybackControl===
!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=t,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.
hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=t,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(t){
return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}},wi=new A,Sd=new Ue,Uy=new A,Ai=new A,Xh=class extends Bl{constructor(t){super(t),this.panner=this.context.
createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){super.connect(),this.panner.connect(this.gain)}disconnect(){super.disconnect(),this.panner.disconnect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.
panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){
return this.panner.maxDistance=t,this}setDirectionalCone(t,e,n){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(wi,
Sd,Uy),Ai.set(0,0,1).applyQuaternion(Sd);let e=this.panner;if(e.positionX){let n=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(wi.x,n),e.positionY.linearRampToValueAtTime(wi.y,n),e.positionZ.linearRampToValueAtTime(wi.z,n),e.orientationX.linearRampToValueAtTime(
Ai.x,n),e.orientationY.linearRampToValueAtTime(Ai.y,n),e.orientationZ.linearRampToValueAtTime(Ai.z,n)}else e.setPosition(wi.x,wi.y,wi.z),e.setOrientation(Ai.x,Ai.y,Ai.z)}},qh=class{constructor(t,e=2048){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=e,this.data=new Uint8Array(this.analyser.
frequencyBinCount),t.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let t=0,e=this.getFrequencyData();for(let n=0;n<e.length;n++)t+=e[n];return t/e.length}},zl=class{constructor(t,e,n){this.binding=t,this.valueSize=
n;let i,r,a;switch(e){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=
this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=
0}accumulate(t,e){let n=this.buffer,i=this.valueSize,r=t*i+i,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=e}else{a+=e;let o=e/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(t){let e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===
0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){let e=this.valueSize,n=this.buffer,i=t*e+e,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=e*this._origIndex;
this._mixBufferRegion(n,i,l,1-r,e)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){o.setValue(n,i);break}}saveOriginalState(){let t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let r=n,a=i;r!==a;++r)e[r]=
e[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){let t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){
this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)t[e+
a]=t[n+a]}_slerp(t,e,n,i){Ue.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,r){let a=this._workIndex*r;Ue.multiplyQuaternionsFlat(t,a,t,e,t,n),Ue.slerpFlat(t,e,t,e,t,a,i)}_lerp(t,e,n,i,r){let a=1-i;for(let o=0;o!==r;++o){let l=e+o;t[l]=t[l]*a+t[n+o]*i}}_lerpAdditive(t,e,n,i,r){for(let a=0;a!==r;++a){
let o=e+a;t[o]=t[o]+t[n+a]*i}}},ku="\\[\\]\\.:\\/",Ny=new RegExp("["+ku+"]","g"),Vu="[^"+ku+"]",Fy="[^"+ku.replace("\\.","")+"]",Oy=/((?:WC+[\/:])*)/.source.replace("WC",Vu),By=/(WCOD+)?/.source.replace("WCOD",Fy),zy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Vu),ky=/\.(WC+)(?:\[(.+)\])?/.source.
replace("WC",Vu),Vy=new RegExp("^"+Oy+By+zy+ky+"$"),Hy=["material","materials","bones","map"],Yh=class{constructor(t,e,n){let i=n||re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&
i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,
n=t.length;e!==n;++e)t[e].unbind()}},re=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?
new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Ny,"")}static parseTrackName(t){let e=Vy.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},
i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Hy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+
t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);
if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){
t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){
this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.
needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.
resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){
this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(
t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found f\
or track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to materia\
l.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===
c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not hav\
e a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is \
undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==
void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){
console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==
void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=
null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};re.Composite=Yh;re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};re.prototype.GetterByBindingType=[re.prototype._getValue_direct,
re.prototype._getValue_array,re.prototype._getValue_arrayElement,re.prototype._getValue_toArray];re.prototype.SetterByBindingTypeAndVersioning=[[re.prototype._setValue_direct,re.prototype._setValue_direct_setNeedsUpdate,re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[re.prototype._setValue_array,
re.prototype._setValue_array_setNeedsUpdate,re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[re.prototype._setValue_arrayElement,re.prototype._setValue_arrayElement_setNeedsUpdate,re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[re.prototype._setValue_fromArray,re.prototype._setValue_fromArray_setNeedsUpdate,
re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Zh=class{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Je(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;let t={};this._indicesByUUID=t;for(let n=0,i=arguments.length;n!==i;++n)t[arguments[n].uuid]=
n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};let e=this;this.stats={objects:{get total(){return e._objects.length},get inUse(){return this.total-e.nCachedObjects_}},get bindingsPerObject(){return e._bindings.length}}}add(){let t=this._objects,e=this._indicesByUUID,
n=this._paths,i=this._parsedPaths,r=this._bindings,a=r.length,o,l=t.length,c=this.nCachedObjects_;for(let h=0,u=arguments.length;h!==u;++h){let f=arguments[h],d=f.uuid,m=e[d];if(m===void 0){m=l++,e[d]=m,t.push(f);for(let _=0,g=a;_!==g;++_)r[_].push(new re(f,n[_],i[_]))}else if(m<c){o=t[m];let _=--c,
g=t[_];e[g.uuid]=m,t[m]=g,e[d]=_,t[_]=f;for(let p=0,y=a;p!==y;++p){let v=r[p],x=v[_],P=v[m];v[m]=x,P===void 0&&(P=new re(f,n[p],i[p])),v[_]=P}}else t[m]!==o&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure whe\
n reloading scenes.")}this.nCachedObjects_=c}remove(){let t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_;for(let a=0,o=arguments.length;a!==o;++a){let l=arguments[a],c=l.uuid,h=e[c];if(h!==void 0&&h>=r){let u=r++,f=t[u];e[f.uuid]=h,t[h]=f,e[c]=u,t[u]=l;for(let d=0,
m=i;d!==m;++d){let _=n[d],g=_[u],p=_[h];_[h]=g,_[u]=p}}}this.nCachedObjects_=r}uncache(){let t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_,a=t.length;for(let o=0,l=arguments.length;o!==l;++o){let c=arguments[o],h=c.uuid,u=e[h];if(u!==void 0)if(delete e[h],u<
r){let f=--r,d=t[f],m=--a,_=t[m];e[d.uuid]=u,t[u]=d,e[_.uuid]=f,t[f]=_,t.pop();for(let g=0,p=i;g!==p;++g){let y=n[g],v=y[f],x=y[m];y[u]=v,y[f]=x,y.pop()}}else{let f=--a,d=t[f];f>0&&(e[d.uuid]=u),t[u]=d,t.pop();for(let m=0,_=i;m!==_;++m){let g=n[m];g[u]=g[f],g.pop()}}}this.nCachedObjects_=r}subscribe_(t,e){
let n=this._bindingsIndicesByPath,i=n[t],r=this._bindings;if(i!==void 0)return r[i];let a=this._paths,o=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,u=new Array(c);i=r.length,n[t]=i,a.push(t),o.push(e),r.push(u);for(let f=h,d=l.length;f!==d;++f){let m=l[f];u[f]=new re(m,t,e)}return u}unsubscribe_(t){
let e=this._bindingsIndicesByPath,n=e[t];if(n!==void 0){let i=this._paths,r=this._parsedPaths,a=this._bindings,o=a.length-1,l=a[o],c=t[o];e[c]=n,a[n]=l,a.pop(),r[n]=r[o],r.pop(),i[n]=i[o],i.pop()}}},kl=class{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=
i;let r=e.tracks,a=r.length,o=new Array(a),l={endingStart:Pi,endingEnd:Pi};for(let c=0;c!==a;++c){let h=r[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=
null,this._weightInterpolant=null,this.loop=rp,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=
!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.
timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?
t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){let i=this._clip.duration,r=t._clip.duration,a=r/i,o=i/r;t.warp(1,a,e),this.warp(o,
1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){let t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.
stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){let i=this.
_mixer,r=i.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=t/a,c[1]=e/a,this}stopWarping(){let t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=
null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}let r=this._startTime;if(r!==null){let l=(t-r)*n;l<0||n===0?e=0:(this._startTime=
null,e=n*l)}e*=this._updateTimeScale(t);let a=this._updateTime(e),o=this._updateWeight(t);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Uu:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case ec:default:for(let h=0,u=l.length;h!==
u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;
if(!this.paused){e=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){let e=this._clip.duration,n=this.loop,i=this.time+t,r=this.
_loopCount,a=n===ap;if(t===0)return r===-1?i:a&&(r&1)===1?e-i:i;if(n===sp){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,
direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=e||i<0){let o=Math.floor(i/e);i-=e*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=
i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){let c=t<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(r&1)===1)return e-i}return i}_setEndings(t,e,n){
let i=this._interpolantSettings;n?(i.endingStart=Di,i.endingEnd=Di):(t?i.endingStart=this.zeroSlopeAtStart?Di:Pi:i.endingStart=vr,e?i.endingEnd=this.zeroSlopeAtEnd?Di:Pi:i.endingEnd=vr)}_scheduleFading(t,e,n){let i=this._mixer,r=i.time,a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),
this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=e,o[1]=r+t,l[1]=n,this}},Gy=new Float32Array(1),Jh=class extends rn{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){let n=t._localRoot||
this._root,i=t._clip.tracks,r=i.length,a=t._propertyBindings,o=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){let f=i[u],d=f.name,m=h[d];if(m!==void 0)++m.referenceCount,a[u]=m;else{if(m=a[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,
this._addInactiveBinding(m,l,d));continue}let _=e&&e._propertyBindings[u].binding.parsedPath;m=new zl(re.create(n,d,_),f.ValueTypeName,f.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,d),a[u]=m}o[u].resultBuffer=m.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===
null){let n=(t._localRoot||this._root).uuid,i=t._clip.uuid,r=this._actionsByClip[i];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,i,n)}let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(
t)}}_deactivateAction(t){if(this._isActiveAction(t)){let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip=
{},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){
return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){let e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){let i=this._actions,r=this._actionsByClip,a=r[e];
if(a===void 0)a={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=a;else{let o=a.knownActions;t._byClipCacheIndex=o.length,o.push(t)}t._cacheIndex=i.length,i.push(t),a.actionByRoot[n]=t}_removeInactiveAction(t){let e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.
pop(),t._cacheIndex=null;let r=t._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;let u=o.actionByRoot,f=(t._localRoot||this._root).uuid;delete u[f],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(
t)}_removeInactiveBindingsForAction(t){let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){let e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){
let e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){let i=this._bindingsByRootAndName,r=this._bindings,a=i[e];a===void 0&&(a={},i[e]=a),a[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){let e=this.
_bindings,n=t.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(t){let e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,r=e[i];t._cacheIndex=
i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){let e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){let t=this._controlInterpolants,e=this._nActiveControlInterpolants++,n=t[e];return n===void 0&&(n=new Xr(new Float32Array(
2),new Float32Array(2),1,Gy),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){let e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,r=e[i];t.__cacheIndex=i,e[i]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){let i=e||this._root,r=i.uuid,a=typeof t=="string"?$i.findByName(
i,t):t,o=a!==null?a.uuid:t,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=ec),l!==void 0){let u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let h=new kl(this,a,e,n);return this._bindAction(h,c),
this._addInactiveAction(h,o,r),h}existingAction(t,e){let n=e||this._root,i=n.uuid,r=typeof t=="string"?$i.findByName(n,t):t,a=r?r.uuid:t,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){let t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){
t*=this.timeScale;let e=this._actions,n=this._nActiveActions,i=this.time+=t,r=Math.sign(t),a=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.
length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){let e=this._actions,n=t.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let h=c._cacheIndex,u=e[e.length-1];
c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){let e=t.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this.
_bindingsByRootAndName,r=i[e];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(t,e){let n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},$h=class s{constructor(t){this.value=t}clone(){return new s(
this.value.clone===void 0?this.value:this.value.clone())}},Wy=0,Kh=class extends rn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:Wy++}),this.name="",this.usage=yr,this.uniforms=[]}add(t){return this.uniforms.push(t),this}remove(t){let e=this.uniforms.indexOf(t);
return e!==-1&&this.uniforms.splice(e,1),this}setName(t){return this.name=t,this}setUsage(t){return this.usage=t,this}dispose(){return this.dispatchEvent({type:"dispose"}),this}copy(t){this.name=t.name,this.usage=t.usage;let e=t.uniforms;this.uniforms.length=0;for(let n=0,i=e.length;n<i;n++){let r=Array.
isArray(e[n])?e[n]:[e[n]];for(let a=0;a<r.length;a++)this.uniforms.push(r[a].clone())}return this}clone(){return new this.constructor().copy(this)}},Qh=class extends Gi{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=
t.meshPerAttribute,this}clone(t){let e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){let e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}},jh=class{constructor(t,e,n,i,r){this.isGLBufferAttribute=!0,this.name="",this.
buffer=t,this.type=e,this.itemSize=n,this.elementSize=i,this.count=r,this.version=0}set needsUpdate(t){t===!0&&this.version++}setBuffer(t){return this.buffer=t,this}setType(t,e){return this.type=t,this.elementSize=e,this}setItemSize(t){return this.itemSize=t,this}setCount(t){return this.count=t,this}},
bd=new Ut,tu=class{constructor(t,e,n=0,i=1/0){this.ray=new li(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new As,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(
e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error(
"THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return bd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(bd),this}intersectObject(t,e=!0,n=[]){return eu(t,this,n,e),n.sort(Ed),n}intersectObjects(t,e=!0,n=[]){
for(let i=0,r=t.length;i<r;i++)eu(t[i],this,n,e);return n.sort(Ed),n}};function Ed(s,t){return s.distance-t.distance}function eu(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)eu(r[a],t,e,!0)}}var nu=class{constructor(t=1,e=0,n=0){
return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(
t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(pe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},iu=class{constructor(t=1,e=0,n=0){return this.
radius=t,this.theta=e,this.y=n,this}set(t,e,n){return this.radius=t,this.theta=e,this.y=n,this}copy(t){return this.radius=t.radius,this.theta=t.theta,this.y=t.y,this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+n*n),
this.theta=Math.atan2(t,n),this.y=e,this}clone(){return new this.constructor().copy(this)}},su=class s{constructor(t,e,n,i){s.prototype.isMatrix2=!0,this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+
e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}},Td=new X,ru=class{constructor(t=new X(1/0,1/0),e=new X(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<
n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Td.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.
min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){
return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.
x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){
return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Td).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.
max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},wd=new A,Ha=new A,au=class{constructor(t=new A,e=new A){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.
addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){
wd.subVectors(t,this.start),Ha.subVectors(this.end,this.start);let n=Ha.dot(Ha),r=Ha.dot(wd)/n;return e&&(r=pe(r,0,1)),r}closestPointToPoint(t,e,n){let i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.
end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},Ad=new A,ou=class extends te{constructor(t,e){super(),this.light=t,this.matrixAutoUpdate=!1,this.color=e,this.type="SpotLightHelper";let n=new Ft,i=[0,0,0,0,
0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){let c=a/l*Math.PI*2,h=o/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new gt(i,3));let r=new Re({fog:!1,toneMapped:!1});this.cone=new on(n,r),this.add(this.cone),
this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):
this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);let t=this.light.distance?this.light.distance:1e3,e=t*Math.tan(this.light.angle);this.cone.scale.set(e,e,t),Ad.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Ad),this.color!==void 0?this.cone.
material.color.set(this.color):this.cone.material.color.copy(this.light.color)}},si=new A,Ga=new Ut,Jc=new Ut,lu=class extends on{constructor(t){let e=Op(t),n=new Ft,i=[],r=[],a=new ot(0,0,1),o=new ot(0,1,0);for(let c=0;c<e.length;c++){let h=e[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,
0),r.push(a.r,a.g,a.b),r.push(o.r,o.g,o.b))}n.setAttribute("position",new gt(i,3)),n.setAttribute("color",new gt(r,3));let l=new Re({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,l),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=t,this.bones=e,this.
matrix=t.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(t){let e=this.bones,n=this.geometry,i=n.getAttribute("position");Jc.copy(this.root.matrixWorld).invert();for(let r=0,a=0;r<e.length;r++){let o=e[r];o.parent&&o.parent.isBone&&(Ga.multiplyMatrices(Jc,o.matrixWorld),si.setFromMatrixPosition(
Ga),i.setXYZ(a,si.x,si.y,si.z),Ga.multiplyMatrices(Jc,o.parent.matrixWorld),si.setFromMatrixPosition(Ga),i.setXYZ(a+1,si.x,si.y,si.z),a+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose()}};function Op(s){let t=[];s.isBone===
!0&&t.push(s);for(let e=0;e<s.children.length;e++)t.push.apply(t,Op(s.children[e]));return t}var cu=class extends he{constructor(t,e,n){let i=new Gr(e,4,2),r=new an({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=t,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,
this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}},Xy=new A,Cd=new ot,Rd=new ot,hu=class extends te{constructor(t,e,n){
super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";let i=new Hr(e);i.rotateY(Math.PI*.5),this.material=new an({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);let r=i.getAttribute("position"),
a=new Float32Array(r.count*3);i.setAttribute("color",new Qt(a,3)),this.add(new he(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){let t=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{let e=t.
geometry.getAttribute("color");Cd.copy(this.light.color),Rd.copy(this.light.groundColor);for(let n=0,i=e.count;n<i;n++){let r=n<i/2?Cd:Rd;e.setXYZ(n,r.r,r.g,r.b)}e.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),t.lookAt(Xy.setFromMatrixPosition(this.light.matrixWorld).negate())}},uu=class extends on{constructor(t=10,e=10,n=4473924,i=8947848){
n=new ot(n),i=new ot(i);let r=e/2,a=t/e,o=t/2,l=[],c=[];for(let f=0,d=0,m=-o;f<=e;f++,m+=a){l.push(-o,0,m,o,0,m),l.push(m,0,-o,m,0,o);let _=f===r?n:i;_.toArray(c,d),d+=3,_.toArray(c,d),d+=3,_.toArray(c,d),d+=3,_.toArray(c,d),d+=3}let h=new Ft;h.setAttribute("position",new gt(l,3)),h.setAttribute("co\
lor",new gt(c,3));let u=new Re({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}},fu=class extends on{constructor(t=10,e=16,n=8,i=64,r=4473924,a=8947848){r=new ot(r),a=new ot(a);let o=[],l=[];if(e>1)for(let u=0;u<e;u++){let f=u/
e*(Math.PI*2),d=Math.sin(f)*t,m=Math.cos(f)*t;o.push(0,0,0),o.push(d,0,m);let _=u&1?r:a;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let u=0;u<n;u++){let f=u&1?r:a,d=t-t/n*u;for(let m=0;m<i;m++){let _=m/i*(Math.PI*2),g=Math.sin(_)*d,p=Math.cos(_)*d;o.push(g,0,p),l.push(f.r,f.g,f.b),_=(m+1)/i*(Math.PI*
2),g=Math.sin(_)*d,p=Math.cos(_)*d,o.push(g,0,p),l.push(f.r,f.g,f.b)}}let c=new Ft;c.setAttribute("position",new gt(o,3)),c.setAttribute("color",new gt(l,3));let h=new Re({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}},
Id=new A,Wa=new A,Pd=new A,du=class extends te{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",e===void 0&&(e=1);let i=new Ft;i.setAttribute("position",new gt([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3));let r=new Re(
{fog:!1,toneMapped:!1});this.lightPlane=new wn(i,r),this.add(this.lightPlane),i=new Ft,i.setAttribute("position",new gt([0,0,0,0,0,1],3)),this.targetLine=new wn(i,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.
geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Id.setFromMatrixPosition(this.light.matrixWorld),Wa.setFromMatrixPosition(this.light.target.matrixWorld),Pd.subVectors(Wa,Id),this.lightPlane.lookAt(Wa),this.
color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(Wa),this.targetLine.scale.z=Pd.length()}},Xa=new A,de=new Rs,
pu=class extends on{constructor(t){let e=new Ft,n=new Re({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),
o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(m,_){l(m),l(_)}function l(m){i.push(0,0,0),r.push(0,0,0),a[m]===void 0&&(a[m]=[]),a[m].push(i.length/3-1)}e.setAttribute("position",new gt(i,3)),
e.setAttribute("color",new gt(r,3)),super(e,n),this.type="CameraHelper",this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();let c=new ot(16755200),h=new ot(16711680),u=new ot(43775),f=new ot(
16777215),d=new ot(3355443);this.setColors(c,h,u,f,d)}setColors(t,e,n,i,r){let o=this.geometry.getAttribute("color");o.setXYZ(0,t.r,t.g,t.b),o.setXYZ(1,t.r,t.g,t.b),o.setXYZ(2,t.r,t.g,t.b),o.setXYZ(3,t.r,t.g,t.b),o.setXYZ(4,t.r,t.g,t.b),o.setXYZ(5,t.r,t.g,t.b),o.setXYZ(6,t.r,t.g,t.b),o.setXYZ(7,t.r,
t.g,t.b),o.setXYZ(8,t.r,t.g,t.b),o.setXYZ(9,t.r,t.g,t.b),o.setXYZ(10,t.r,t.g,t.b),o.setXYZ(11,t.r,t.g,t.b),o.setXYZ(12,t.r,t.g,t.b),o.setXYZ(13,t.r,t.g,t.b),o.setXYZ(14,t.r,t.g,t.b),o.setXYZ(15,t.r,t.g,t.b),o.setXYZ(16,t.r,t.g,t.b),o.setXYZ(17,t.r,t.g,t.b),o.setXYZ(18,t.r,t.g,t.b),o.setXYZ(19,t.r,t.
g,t.b),o.setXYZ(20,t.r,t.g,t.b),o.setXYZ(21,t.r,t.g,t.b),o.setXYZ(22,t.r,t.g,t.b),o.setXYZ(23,t.r,t.g,t.b),o.setXYZ(24,e.r,e.g,e.b),o.setXYZ(25,e.r,e.g,e.b),o.setXYZ(26,e.r,e.g,e.b),o.setXYZ(27,e.r,e.g,e.b),o.setXYZ(28,e.r,e.g,e.b),o.setXYZ(29,e.r,e.g,e.b),o.setXYZ(30,e.r,e.g,e.b),o.setXYZ(31,e.r,e.
g,e.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,i.r,i.g,i.b),o.setXYZ(39,i.r,i.g,i.b),o.setXYZ(40,r.r,r.g,r.b),o.setXYZ(41,r.r,r.g,r.b),o.setXYZ(42,r.r,r.g,r.b),o.setXYZ(43,r.r,r.
g,r.b),o.setXYZ(44,r.r,r.g,r.b),o.setXYZ(45,r.r,r.g,r.b),o.setXYZ(46,r.r,r.g,r.b),o.setXYZ(47,r.r,r.g,r.b),o.setXYZ(48,r.r,r.g,r.b),o.setXYZ(49,r.r,r.g,r.b),o.needsUpdate=!0}update(){let t=this.geometry,e=this.pointMap,n=1,i=1;de.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),me("\
c",e,t,de,0,0,-1),me("t",e,t,de,0,0,1),me("n1",e,t,de,-n,-i,-1),me("n2",e,t,de,n,-i,-1),me("n3",e,t,de,-n,i,-1),me("n4",e,t,de,n,i,-1),me("f1",e,t,de,-n,-i,1),me("f2",e,t,de,n,-i,1),me("f3",e,t,de,-n,i,1),me("f4",e,t,de,n,i,1),me("u1",e,t,de,n*.7,i*1.1,-1),me("u2",e,t,de,-n*.7,i*1.1,-1),me("u3",e,t,
de,0,i*2,-1),me("cf1",e,t,de,-n,0,1),me("cf2",e,t,de,n,0,1),me("cf3",e,t,de,0,-i,1),me("cf4",e,t,de,0,i,1),me("cn1",e,t,de,-n,0,-1),me("cn2",e,t,de,n,0,-1),me("cn3",e,t,de,0,-i,-1),me("cn4",e,t,de,0,i,-1),t.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}};
function me(s,t,e,n,i,r,a){Xa.set(i,r,a).unproject(n);let o=t[s];if(o!==void 0){let l=e.getAttribute("position");for(let c=0,h=o.length;c<h;c++)l.setXYZ(o[c],Xa.x,Xa.y,Xa.z)}}var qa=new Ce,mu=class extends on{constructor(t,e=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,
6,3,7]),i=new Float32Array(8*3),r=new Ft;r.setIndex(new Qt(n,1)),r.setAttribute("position",new Qt(i,3)),super(r,new Re({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(t){if(t!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer \
arguments."),this.object!==void 0&&qa.setFromObject(this.object),qa.isEmpty())return;let e=qa.min,n=qa.max,i=this.geometry.attributes.position,r=i.array;r[0]=n.x,r[1]=n.y,r[2]=n.z,r[3]=e.x,r[4]=n.y,r[5]=n.z,r[6]=e.x,r[7]=e.y,r[8]=n.z,r[9]=n.x,r[10]=e.y,r[11]=n.z,r[12]=n.x,r[13]=n.y,r[14]=e.z,r[15]=e.
x,r[16]=n.y,r[17]=e.z,r[18]=e.x,r[19]=e.y,r[20]=e.z,r[21]=n.x,r[22]=e.y,r[23]=e.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.
dispose()}},gu=class extends on{constructor(t,e=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new Ft;r.setIndex(new Qt(n,1)),r.setAttribute("position",new gt(i,3)),super(r,new Re({color:e,toneMapped:!1})),
this.box=t,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(t){let e=this.box;e.isEmpty()||(e.getCenter(this.position),e.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(t))}dispose(){this.geometry.dispose(),this.material.dispose()}},_u=class extends wn{constructor(t,e=1,n=16776960){
let i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],a=new Ft;a.setAttribute("position",new gt(r,3)),a.computeBoundingSphere(),super(a,new Re({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=t,this.size=e;let o=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new Ft;l.setAttribute(
"position",new gt(o,3)),l.computeBoundingSphere(),this.add(new he(l,new an({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(t){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),
super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}},Dd=new A,Ya,$c,xu=class extends te{constructor(t=new A(0,0,1),e=new A(0,0,0),n=1,i=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",Ya===
void 0&&(Ya=new Ft,Ya.setAttribute("position",new gt([0,0,0,0,1,0],3)),$c=new Ls(0,.5,1,5,1),$c.translate(0,-.5,0)),this.position.copy(e),this.line=new wn(Ya,new Re({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new he($c,new an({color:i,toneMapped:!1})),this.cone.
matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,r,a)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{Dd.set(t.z,0,-t.x).normalize();let e=Math.acos(t.y);this.quaternion.setFromAxisAngle(Dd,e)}}setLength(t,e=t*
.2,n=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(
t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},vu=class extends on{constructor(t=1){let e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Ft;i.setAttribute("position",
new gt(e,3)),i.setAttribute("color",new gt(n,3));let r=new Re({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(t,e,n){let i=new ot,r=this.geometry.attributes.color.array;return i.set(t),i.toArray(r,0),i.toArray(r,3),i.set(e),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(
r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}},yu=class{constructor(){this.type="ShapePath",this.color=new ot,this.subPaths=[],this.currentPath=null}moveTo(t,e){return this.currentPath=new Wi,this.subPaths.push(this.
currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,i){return this.currentPath.quadraticCurveTo(t,e,n,i),this}bezierCurveTo(t,e,n,i,r,a){return this.currentPath.bezierCurveTo(t,e,n,i,r,a),this}splineThru(t){return this.currentPath.
splineThru(t),this}toShapes(t){function e(p){let y=[];for(let v=0,x=p.length;v<x;v++){let P=p[v],T=new Hn;T.curves=P.curves,y.push(T)}return y}function n(p,y){let v=y.length,x=!1;for(let P=v-1,T=0;T<v;P=T++){let C=y[P],R=y[T],b=R.x-C.x,M=R.y-C.y;if(Math.abs(M)>Number.EPSILON){if(M<0&&(C=y[T],b=-b,R=
y[P],M=-M),p.y<C.y||p.y>R.y)continue;if(p.y===C.y){if(p.x===C.x)return!0}else{let D=M*(p.x-C.x)-b*(p.y-C.y);if(D===0)return!0;if(D<0)continue;x=!x}}else{if(p.y!==C.y)continue;if(R.x<=p.x&&p.x<=C.x||C.x<=p.x&&p.x<=R.x)return!0}}return x}let i=En.isClockWise,r=this.subPaths;if(r.length===0)return[];let a,
o,l,c=[];if(r.length===1)return o=r[0],l=new Hn,l.curves=o.curves,c.push(l),c;let h=!i(r[0].getPoints());h=t?!h:h;let u=[],f=[],d=[],m=0,_;f[m]=void 0,d[m]=[];for(let p=0,y=r.length;p<y;p++)o=r[p],_=o.getPoints(),a=i(_),a=t?!a:a,a?(!h&&f[m]&&m++,f[m]={s:new Hn,p:_},f[m].s.curves=o.curves,h&&m++,d[m]=
[]):d[m].push({h:o,p:_[0]});if(!f[0])return e(r);if(f.length>1){let p=!1,y=0;for(let v=0,x=f.length;v<x;v++)u[v]=[];for(let v=0,x=f.length;v<x;v++){let P=d[v];for(let T=0;T<P.length;T++){let C=P[T],R=!0;for(let b=0;b<f.length;b++)n(C.p,f[b].p)&&(v!==b&&y++,R?(R=!1,u[b].push(C)):p=!0);R&&u[v].push(C)}}
y>0&&p===!1&&(d=u)}let g;for(let p=0,y=f.length;p<y;p++){l=f[p].s,c.push(l),g=d[p];for(let v=0,x=g.length;v<x;v++)l.holes.push(g[v].h)}return c}},Mu=class extends rn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,
MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}},Su=class extends Me{constructor(t=1,e=1,n=1,i={}){console.warn('THREE.WebGLMultipleRenderTargets has been deprecated and will be removed in r172. Use THREE.WebGLRenderTarget and set the "count" p\
arameter to enable MRT.'),super(t,e,{...i,count:n}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING\
: Multiple instances of Three.js being imported."):window.__THREE__=Vl);function zp(s,t=!1){let e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new Ft,c=0;for(let h=0;h<s.length;++h){let u=s[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mer\
geGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed wit\
h geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() fai\
led with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometr\
ies."),null;for(let d in u.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(u.morphAttributes[d])}if(t){let d;
if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){
let h=0,u=[];for(let f=0;f<s.length;++f){let d=s[f].index;for(let m=0;m<d.count;++m)u.push(d.getX(m)+h);h+=s[f].attributes.position.count}l.setIndex(u)}for(let h in r){let u=Bp(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attr\
ibute."),null;l.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let _=0;_<a[h].length;++_)d.push(a[h][_][f]);let m=Bp(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mer\
geGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function Bp(s){let t,e,n,i=-1,r=0;for(let c=0;c<s.length;++c){let h=s[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils:\
 .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching \
attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGe\
ometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new Qt(a,e,n),l=0;for(let c=0;c<s.length;++c){let h=s[c];if(h.isInterleavedBufferAttribute){let u=l/e;for(let f=0,d=h.count;f<d;f++)for(let m=0;m<e;m++){
let _=h.getComponent(f,m);o.setComponent(f+u,m,_)}}else a.set(h.array,l);l+=h.count*e}return i!==void 0&&(o.gpuType=i),o}var sc={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var je=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},qy=new ci(-1,1,1,-1,0,1),Gu=class extends Ft{constructor(){super(),this.setAttribute(
"position",new gt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new gt([0,2,0,0,2,0],2))}},Yy=new Gu,di=class{constructor(t){this._mesh=new he(Yy,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,qy)}get material(){return this._mesh.material}set material(t){this._mesh.material=
t}};var Bs=class extends je{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ge?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Jn.clone(t.uniforms),this.material=new ge({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.
uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new di(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):
(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var ta=class extends je{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?
(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(
e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),
r.buffers.stencil.setLocked(!0)}},rc=class extends je{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var ac=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new X);this._width=n.width,this._height=n.height,e=new Me(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ln}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,
this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Bs(sc),this.copyPass.material.blending=mn,this.clock=
new Ns}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){
let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),n=!1;for(let i=0,r=this.passes.length;i<r;i++){let a=this.
passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(
this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}ta!==void 0&&(a instanceof ta?n=!0:a instanceof rc&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new X);this._pixelRatio=this.renderer.getPixelRatio(),
this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=
this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(
this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var oc=class extends je{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ot}render(t,e,n){let i=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==
null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&
t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==
null&&(this.scene.overrideMaterial=a),t.autoClear=i}};var kp={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ot(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var zs=class s extends je{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new X(t.x,t.y):new X(256,256),this.clearColor=new ot(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.
x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Me(r,a,{type:ln}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let f=new Me(r,a,{type:ln});f.texture.name="UnrealBloomPass.h"+u,f.texture.
generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let d=new Me(r,a,{type:ln});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),a=Math.round(a/2)}let o=kp;this.highPassUniforms=Jn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.
value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ge({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<
this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new X(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=
this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,
this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new A(1,
1,1),new A(1,1,1),new A(1,1,1),new A(1,1,1),new A(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=sc;this.copyUniforms=Jn.clone(h.uniforms),this.blendMaterial=new ge({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:dr,
depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ot,this.oldClearAlpha=1,this.basic=new an,this.fsQuad=new di(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.
length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.
round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new X(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){
t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.
render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)
this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=s.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].
uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=s.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.
compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=
this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),
t.autoClear=a}getSeperableBlurMaterial(t){let e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new ge({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new X(.5,.5)},direction:{value:new X(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varyi\
ng vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new ge({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{
value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};zs.BlurDirectionX=new X(1,0);zs.BlurDirectionY=new X(0,1);var Vp={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var lc=class extends je{constructor(){super();let t=Vp;this.uniforms=Jn.clone(t.uniforms),this.material=new Us({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new di(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){
this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},qt.getTransfer(this.
_outputColorSpace)===jt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Hl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Gl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Wl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Xl?this.
material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ql?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Yl&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(
e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Hp={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new X(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		// FXAA algorithm from NVIDIA, C# implementation by Jasper Flick, GLSL port by Dave Hoskins
		// http://developer.download.nvidia.com/assets/gamedev/files/sdk/11/FXAA_WhitePaper.pdf
		// https://catlikecoding.com/unity/tutorials/advanced-rendering/fxaa/

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;
			
			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {
				
				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );
			
		}`};var Zy=Object.assign({},Hu,{mergeGeometries:zp,EffectComposer:ac,RenderPass:oc,ShaderPass:Bs,UnrealBloomPass:zs,OutputPass:lc,FXAAShader:Hp});self.THREE=Zy;})();
