(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{151:function(e,t,n){e.exports=n(354)},174:function(e,t,n){},354:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(27),c=n.n(o),i=n(90),s=n(366),l=n(146),u=n(7),m=n(62),d=n(149),p=n(367);n(172),n(174),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var f=n(9),h=n(96),g=n(10),v=n.n(g),b=n(6),y=n.n(b),w=n(8),E=n(42),x=n(11),_=n(4),j=n(136),O=n.n(j),C=n(26),k=n(15),S=n(16),T=n(18),N=n(17),A=n(19),D=n(61),U=n.n(D),I=function(e){function t(){var e,n;Object(k.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(T.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).state={data:{email:"",password:""},formErrors:{}},n.componentDidUpdate=function(){var e=n.props.data;e&&e.signUp.error&&(n.state.formErrors.email!==e.signUp.error&&n.setState({formErrors:{email:e.signUp.error}}))},n.onChange=function(e){var t=e.target,a=t.name,r=t.value;n.setState(function(e){var t=e.data;return{data:Object(x.a)({},t,Object(C.a)({},a,r))}})},n.onSubmit=function(){var e=Object(w.a)(y.a.mark(function e(t){var a,r;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a=n.state.data,r=n.validate(a),n.setState({formErrors:r}),0===Object.keys(r).length&&(0,n.props.signUp)({variables:Object(x.a)({},a)});case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.validate=function(e){var t=e.email,n=e.password,a={};return U()(t)||(a.email="Invalid email"),n||(a.password="Can't be blank"),a},n}return Object(A.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this.state,t=e.data,n=e.formErrors,a=this.props.loading;return r.a.createElement(_.j,{style:{height:"calc(100vh - 72px)"}},r.a.createElement(_.t,{className:"align-items-center justify-content-center",style:{height:"inherit"}},r.a.createElement(_.h,{xs:"12",sm:"8",lg:"6"},r.a.createElement(_.c,null,r.a.createElement(_.e,null,r.a.createElement("h4",{className:"mb-0"},"Join the Club!")),r.a.createElement(_.d,null,r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{className:"form-label w-100",htmlFor:"email"},"Email",r.a.createElement("input",{type:"email",id:"email",name:"email",value:t.email,onChange:this.onChange,className:n.email?"form-control is-invalid":"form-control"}),r.a.createElement("div",{className:"invalid-feedback"},n.email))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{className:"form-label w-100",htmlFor:"password"},"Password",r.a.createElement("input",{type:"password",id:"password",name:"password",value:t.password,onChange:this.onChange,className:n.password?"form-control is-invalid":"form-control"}),r.a.createElement("div",{className:"invalid-feedback"},n.password))),r.a.createElement(_.b,{disabled:a,type:"submit",color:"primary",className:"btn-block"},"Sign Up")))))))}}]),t}(a.Component);I.defaultProps={data:{signUp:{error:null}}};var R=I,q=function(e){function t(){var e,n;Object(k.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(T.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).state={data:{email:"",password:""},formErrors:{}},n.onChange=function(e){var t=e.target,a=t.name,r=t.value;n.setState(function(e){var t=e.data;return{data:Object(x.a)({},t,Object(C.a)({},a,r))}})},n.onSubmit=function(){var e=Object(w.a)(y.a.mark(function e(t){var a,r,o,c,i,s,l,u,m;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),a=n.state.data,r=n.validate(a),n.setState({formErrors:r}),0!==Object.keys(r).length){e.next=16;break}return o=n.props,c=o.logIn,i=o.fetchUser,e.next=8,c({variables:Object(x.a)({},a)});case 8:if(s=e.sent,l=s.data.logIn,u=l.token,(m=l.error)&&n.setState({formErrors:{email:m.email,password:m.password}}),!u){e.next=16;break}return e.next=16,i(u);case 16:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.validate=function(e){var t=e.email,n=e.password,a={};return U()(t)||(a.email="Invalid email"),n||(a.password="Can't be blank"),a},n}return Object(A.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.data,a=t.formErrors,o=this.props,c=o.loading,i=o.viewerFetching;return r.a.createElement(_.k,{className:"header-login-form align-items-start",inline:!0,onSubmit:function(t){e.onSubmit(t)}},a.server&&r.a.createElement("div",{className:"alert alert-danger"},a.server),r.a.createElement(_.l,{className:"header-email-container mr-sm-2 mb-0"},r.a.createElement(_.n,{for:"exampleEmail",className:"mr-sm-2 align-self-start"},"Email"),r.a.createElement("div",{className:"d-flex flex-column"},r.a.createElement(_.m,{type:"email",name:"email",id:"exampleEmail",placeholder:"something@idk.cool",bsSize:"sm",value:n.email,onChange:this.onChange,className:a.email?"form-control is-invalid":"form-control"}),r.a.createElement("div",{className:"invalid-feedback w-auto"},a.email))),r.a.createElement(_.l,{className:"header-password-container mr-sm-2 mb-0"},r.a.createElement(_.n,{for:"examplePassword",className:"mr-sm-2 align-self-start"},"Password"),r.a.createElement("div",{className:"d-flex flex-column"},r.a.createElement(_.m,{type:"password",name:"password",id:"examplePassword",placeholder:"don't tell!",bsSize:"sm",value:n.password,onChange:this.onChange,className:a.password?"form-control is-invalid":"form-control"}),r.a.createElement("div",{className:"invalid-feedback w-auto"},a.password))),r.a.createElement(_.b,{disabled:i||c,className:"header-login-button",color:"primary",size:"sm"},"Log In"))}}]),t}(a.Component);q.defaultProps={data:{logIn:{error:{email:null,password:null}}}};var Q=q,$=function(e){function t(){var e,n;Object(k.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(T.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).state={text:"",loading:!1},n.onChange=function(e){var t=e.target,a=t.name,r=t.value;n.setState(Object(C.a)({},a,r))},n.onSubmit=function(){var e=Object(w.a)(y.a.mark(function e(t){var a,r;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),n.setState({loading:!0}),a=n.props.submit,!(r=n.state.text)){e.next=8;break}return e.next=7,a({text:r.trim()});case 7:n.setState({text:"",loading:!1});case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n}return Object(A.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this.state,t=e.text,n=e.loading;return r.a.createElement(_.k,{className:" form-inline justify-content-center mx-auto mt-4 mb-xs-1 mb-md-5 align-items-start ",onSubmit:this.onSubmit},r.a.createElement(_.m,{type:"text",id:"text",name:"text",value:t,placeholder:"Add Todo",disabled:n,onChange:this.onChange,className:"form-control w-75"}))}}]),t}(a.Component),F=function(e){function t(){var e,n;Object(k.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(T.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).state={text:""},n.onChange=function(e){var t=n.props.clearText;n.setState({text:e.target.value.trim()}),t()},n.onSubmit=function(){var e=Object(w.a)(y.a.mark(function e(t){var a,r;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),a=n.state.text,r=n.props.search,!a){e.next=6;break}return e.next=6,r({text:a});case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n}return Object(A.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this.state.text;return r.a.createElement(_.k,{className:" form-inline justify-content-center mx-auto mt-4 mb-xs-1 mb-md-5 align-items-start ",onSubmit:this.onSubmit},r.a.createElement(_.m,{placeholder:"Search your todos",value:e,className:"form-control w-75",onChange:this.onChange}))}}]),t}(a.Component),M=function(e){function t(){var e,n;Object(k.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(T.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).state={text:""},n.componentDidMount=function(){var e=n.props.text;n.setState({text:e})},n.onSubmit=function(e){e.preventDefault();var t=n.state.text,a=n.props,r=a.handleIsEditing,o=a._id,c=a.text,i=a.updateTodoText;t&&t!==c?i({_id:o,text:t}):n.setState({text:c}),r()},n.onChange=function(e){var t=e.target.value;n.setState({text:t})},n}return Object(A.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this.state.text;return r.a.createElement(_.k,{onSubmit:this.onSubmit},r.a.createElement(_.m,{type:"text",value:e,onChange:this.onChange,onBlur:this.onSubmit}))}}]),t}(a.Component),P=n(138),z=n.n(P),L=n(139),B=n(147);function J(){var e=Object(f.a)(["\n    display: block;\n    margin: 0 auto;\n    border-color: red;\n"]);return J=function(){return e},e}var W=Object(B.a)(J()),G=function(e){var t=e.loading;return r.a.createElement("div",{className:"loading-container"},r.a.createElement(L.ClipLoader,{className:W,sizeUnit:"px",size:100,color:"#123abc",loading:t}))},H=n(141),V=n(142);function K(e){return function(e,t){var n=e-t;return n<2e4?"just now":n<6e4?"less than 1 min ago":n<36e5?"".concat(Math.round(n/6e4)," min ago"):n<864e5?"".concat(Math.round(n/36e5)," h ago"):n<2592e6?"".concat(Math.round(n/864e5)," days ago"):n<31536e6?"".concat(Math.round(n/2592e6)," mo ago"):"".concat(Math.round(n/31536e6)," years ago")}((new Date).getTime(),new Date(e).getTime())}function X(){var e=Object(f.a)(["\n    fragment Todo on Todo {\n      __typename\n      _id\n      complete\n      createdAt\n      updatedAt\n      text\n    }\n  "]);return X=function(){return e},e}function Y(){var e=Object(f.a)(["\n                                fragment ToggleCompleteFragment on Todo {\n                                  __typename\n                                  _id\n                                  complete\n                                  updatedAt\n                                }\n                              "]);return Y=function(){return e},e}function Z(){var e=Object(f.a)(["\n  mutation ToggleComplete($input: ToggleCompleteInput!) {\n    toggleComplete(input: $input) {\n      __typename\n      toggledIds # the deleted _id\n    }\n  }\n"]);return Z=function(){return e},e}function ee(){var e=Object(f.a)(["\n  mutation DeleteTodo($input: DeleteTodoInput!) {\n    deleteTodo(input: $input) {\n      __typename\n      _id # the deleted _id\n    }\n  }\n"]);return ee=function(){return e},e}function te(){var e=Object(f.a)(["\n  mutation UpdateTodoText($input: UpdateTodoTextInput!) {\n    __typename\n    updateTodoText(input: $input) {\n      __typename\n      todo {\n        __typename\n        _id\n        updatedAt\n        text\n      }\n    }\n  }\n"]);return te=function(){return e},e}var ne=v()(te()),ae=v()(ee()),re=v()(Z()),oe=function(e){function t(){var e,n;Object(k.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(T.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).state={isEditing:!1},n.componentDidMount=function(){(0,n.props.subscribeToTodoUpdatedText)()},n.handleIsEditing=function(){n.setState(function(e){return{isEditing:!e.isEditing}})},n}return Object(A.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this,t=this.state.isEditing,n=this.props.todo,a=n._id,o=n.complete,c=n.createdAt,i=n.updatedAt,s=n.text;return r.a.createElement(u.ApolloConsumer,null,function(n){var l=n.readQuery({query:Qe}).viewer,m=n.readQuery({query:je}).sort,d=function(){n.writeQuery({query:Qe,data:{__typename:"Query",viewer:Object(x.a)({__typename:"User"},l,{todos:l.todos.filter(function(e){return e._id!==a}),todosCount:l.todosCount-1})}})};return r.a.createElement(_.h,{lg:"4",md:"6",sm:"12"},r.a.createElement(_.c,{className:"mx-auto mt-4 w-75 p-3"},r.a.createElement(_.d,null,r.a.createElement(_.g,{className:"d-flex align-items-center justify-content-between"},r.a.createElement(u.Mutation,{mutation:re},function(e){return r.a.createElement(_.m,{onChange:Object(w.a)(y.a.mark(function t(){return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n.writeFragment({id:a,fragment:v()(Y()),data:{__typename:"Todo",_id:a,complete:!o,updatedAt:(new Date).toISOString()}}),t.next=3,e({variables:{input:{_ids:[a],complete:!o}}});case 3:"all"!==m&&(console.log("sort",m),console.log("remove todo!"),d());case 4:case"end":return t.stop()}},t,this)})),checked:o,type:"checkbox"})}),t?r.a.createElement(u.Mutation,{mutation:ne},function(t){return r.a.createElement(M,{_id:a,text:s,handleIsEditing:e.handleIsEditing,updateTodoText:function(e){return t({variables:{input:Object(x.a)({},e)},optimisticResponse:{__typename:"Mutation",updateTodoText:{__typename:"UpdateTodoTextResponse",todo:{__typename:"Todo",_id:a,text:e.text,updatedAt:(new Date).toISOString()}}}})}})}):r.a.createElement("div",{onDoubleClick:e.handleIsEditing,style:{textDecoration:o?"line-through":"none",cursor:"pointer"},className:"mx-auto"},s),r.a.createElement(u.Mutation,{mutation:ae},function(e,t){var o=t.client;return r.a.createElement(H.Icon,{onClick:Object(w.a)(y.a.mark(function t(){var r,c,i,s,u;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return d(),l.todosCount>9&&n.writeData({data:{showRefresh:!0}}),t.next=4,e({variables:{input:{_id:a}}});case 4:if(r=o.readQuery({query:Qe}),c=r.viewer,i=o.readQuery({query:je}),s=i.page,u=i.sort,c.todos.length||!(l.todosCount>1)){t.next=11;break}return o.writeData({data:{todosRefetching:!0}}),t.next=10,o.query({query:Qe,variables:{page:s,sort:u},fetchPolicy:"network-only"});case 10:o.writeData({data:{todosRefetching:!1,showRefresh:!1}});case 11:case"end":return t.stop()}},t,this)})),style:{color:"red",cursor:"pointer"},icon:V.remove})})),r.a.createElement(_.f,{className:"mt-2 text-center",style:{borderTop:"solid black 1px"}},c===i?"Added ".concat(K(c)):"Updated ".concat(K(i))))))})}}]),t}(a.Component);oe.fragments={todo:v()(X())};var ce=oe;function ie(){var e=Object(f.a)(["\n  subscription todoUpdatedText {\n    todoUpdatedText {\n      __typename\n        _id\n        text\n        complete\n        createdAt\n        updatedAt\n    }\n  }\n"]);return ie=function(){return e},e}var se=v()(ie()),le=function(e){function t(){var e,n;Object(k.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(T.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).componentDidMount=function(){(0,n.props.subscribeToNewTodos)()},n}return Object(A.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){return r.a.createElement(u.ApolloConsumer,null,function(e){return r.a.createElement(_.j,null,r.a.createElement(u.Query,{query:je},function(t){var n=t.data,a=n.page,o=n.sort,c=n.todosRefetching,i=n.showRefresh;return r.a.createElement(u.Query,{query:Qe},function(t){var n=t.data.viewer,s=t.loading,l=t.refetch,u=t.error,m=t.subscribeToMore,d=c||s;return u?"Error!: ".concat(u):d||n.todosCount||"all"!==o?d||n.todosCount?r.a.createElement(r.a.Fragment,null,r.a.createElement(_.t,{style:{minHeight:"60vh"}},d?r.a.createElement("div",{className:"position-relative w-100"},r.a.createElement(G,{loading:d})):n.todos.map(function(e){return r.a.createElement(ce,{key:e._id,todo:e,subscribeToTodoUpdatedText:function(){return m({document:se,updateQuery:function(e,t){var a=t.subscriptionData;if(!a.data)return e;var r=a.data.todoUpdatedText;return{__typename:"Query",viewer:Object(x.a)({},n,{__typename:"User",todos:Object(E.a)(n.todos).map(function(e){return e._id===r._id?r:e})})}}})}})})),r.a.createElement(_.t,{className:"mt-2 d-flex flex-column justify-content-center align-items-center"},i&&r.a.createElement(_.b,{color:"primary",className:"btn-block w-25",onClick:Object(w.a)(y.a.mark(function t(){return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l({page:a,sort:o});case 2:e.writeData({data:{showRefresh:!1}});case 3:case"end":return t.stop()}},t,this)}))},"Refresh Page"),r.a.createElement(z.a,{activePage:a,itemsCountPerPage:9,totalItemsCount:n.todosCount,pageRangeDisplayed:5,onChange:function(){var t=Object(w.a)(y.a.mark(function t(n){return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.writeData({data:{page:n}}),l({page:n,sort:o});case 2:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()}))):r.a.createElement(_.a,{color:"info"},r.a.createElement("h5",{className:"m-0"},"No ".concat(o,"d todos"))):r.a.createElement(_.t,null,r.a.createElement(_.a,{color:"info"},r.a.createElement("h5",null,"No todos")))})}))})}}]),t}(r.a.Component),ue=n(95),me=n.n(ue),de=n(143),pe=n.n(de),fe=n(144),he=n.n(fe);function ge(){var e=Object(f.a)(["\n                    fragment ToggleCompleteFragment on Todo {\n                      __typename\n                      _id\n                      complete\n                      updatedAt\n                    }\n                  "]);return ge=function(){return e},e}function ve(){var e=Object(f.a)(["\n  mutation ClearCompleted($input: ClearCompletedInput!) {\n    __typename\n    clearCompleted(input: $input) {\n      __typename\n      clearedIds # the deleted _id\n    }\n  }\n"]);return ve=function(){return e},e}var be=v()(ve()),ye=function(){return r.a.createElement(u.ApolloConsumer,null,function(e){return r.a.createElement(u.Query,{query:je},function(t){var n=t.data,a=n.sort,o=n.page,c=n.search;return r.a.createElement(u.Query,{query:Qe},function(t){var n=t.data.viewer,i=t.refetch,s=t.error,l=function(e){return me()(he()(n.todos,function(t){return t.complete===e}),function(e){return e._id})},m=pe()(me()(n.todos,function(e){return e.complete}),function(e){return!0===e}),d=function(){var t=Object(w.a)(y.a.mark(function t(n){var a,r;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:a=n._ids,r=n.complete,a.forEach(function(t){e.writeFragment({id:t,fragment:v()(ge()),data:{__typename:"Todo",_id:t,complete:r,updatedAt:(new Date).toISOString()}})});case 2:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),p=l(!0),f=l(!1);return s?"Error!: ".concat(s):r.a.createElement(_.j,null,r.a.createElement(_.t,{className:"my-3"},r.a.createElement(_.h,{lg:"2",className:"d-flex justify-content-center align-items-center"},"Total: ",n.todosCount),r.a.createElement(_.h,{lg:"8",className:"filter d-flex justify-content-center align-items-center"},r.a.createElement("div",{className:"d-flex align-items-center"},r.a.createElement(u.Mutation,{mutation:re},function(t){return r.a.createElement(_.m,{onChange:Object(w.a)(y.a.mark(function n(){var r,s;return y.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r={},m?(r._ids=p,r.complete=!1,d({_ids:p,complete:!1})):(r._ids=f,r.complete=!0,d({_ids:f,complete:!0})),n.next=4,t({variables:{input:r}});case 4:if("all"===a){n.next=10;break}return e.writeData({data:{todosRefetching:!0}}),s=o>1?o-1:o,n.next=9,i({page:s,sort:a,search:c});case 9:e.writeData({data:{todosRefetching:!1,page:s}});case 10:case"end":return n.stop()}},n,this)})),disabled:!n.todosCount,checked:m,type:"checkbox",className:"mt-0"})}),m?"Deselect All":"Select All"),r.a.createElement("div",{className:"nav-container d-flex justify-content-around"},r.a.createElement(_.b,{size:"md",color:"link",name:"all",onClick:Object(w.a)(y.a.mark(function t(){return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.writeData({data:{todosRefetching:!0,showRefresh:!1}}),t.next=3,i({page:1,sort:"all",search:c});case 3:e.writeData({data:{sort:"all",page:1,todosRefetching:!1}});case 4:case"end":return t.stop()}},t,this)})),disabled:"all"===a},"All"),r.a.createElement(_.b,{size:"md",color:"link",name:"active",onClick:Object(w.a)(y.a.mark(function t(){return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.writeData({data:{todosRefetching:!0,showRefresh:!1}}),t.next=3,i({page:1,sort:"active",search:c});case 3:e.writeData({data:{sort:"active",page:1,todosRefetching:!1}});case 4:case"end":return t.stop()}},t,this)})),disabled:"active"===a},"Active"),r.a.createElement(_.b,{size:"md",color:"link",name:"complete",onClick:Object(w.a)(y.a.mark(function t(){return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.writeData({data:{todosRefetching:!0,showRefresh:!1}}),t.next=3,i({page:1,sort:"complete",search:c});case 3:e.writeData({data:{sort:"complete",page:1,todosRefetching:!1}});case 4:case"end":return t.stop()}},t,this)})),disabled:"complete"===a},"Completed"))),r.a.createElement(_.h,{lg:"2",className:"d-flex align-items-center justify-content-center"},r.a.createElement(u.Mutation,{mutation:be},function(t){return r.a.createElement(_.b,{size:"md",color:"link",disabled:!p.length,onClick:Object(w.a)(y.a.mark(function r(){return y.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(e.writeQuery({query:Qe,data:{__typename:"Query",viewer:Object(x.a)({__typename:"User"},n,{todos:n.todos.filter(function(e){var t=e._id;return!p.includes(t)}),todosCount:n.todosCount-p.length})}}),n.todos.length!==p.length){r.next=10;break}return e.writeData({data:{todosRefetching:!0}}),r.next=5,t({variables:{input:{_ids:p}}});case 5:return r.next=7,i({page:o,sort:a,search:c});case 7:e.writeData({data:{todosRefetching:!1,showRefresh:!1}}),r.next=13;break;case 10:return r.next=12,t({variables:{input:{_ids:p}}});case 12:e.writeData({data:{showRefresh:!0}});case 13:case"end":return r.stop()}},r,this)}))},"Clear Completed")}))))})})})};function we(){var e=Object(f.a)(["\n  subscription todoAdded {\n    todoAdded {\n      __typename\n        _id\n        text\n        complete\n        createdAt\n        updatedAt\n    }\n  }\n"]);return we=function(){return e},e}function Ee(){var e=Object(f.a)(["\n  query Client {\n    __typename\n    page @client\n    sort @client\n    todosRefetching @client\n    showRefresh @client\n    isLoggedIn @client\n    viewerFetching @client\n    search @client\n  }\n"]);return Ee=function(){return e},e}function xe(){var e=Object(f.a)(["\n  mutation AddTodo($text: String!) {\n    __typename\n    addTodo(text: $text) {\n      __typename\n      todo {\n        __typename\n        _id\n        text\n        complete\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"]);return xe=function(){return e},e}var _e=v()(xe()),je=v()(Ee()),Oe=v()(we());var Ce=function(){return r.a.createElement(u.ApolloConsumer,null,function(e){return r.a.createElement(u.Query,{query:je},function(t){var n=t.data.sort;return r.a.createElement(u.Query,{query:Qe},function(t){var a=t.data.viewer,o=t.refetch,c=t.subscribeToMore;return r.a.createElement(r.a.Fragment,null,r.a.createElement(_.j,null,r.a.createElement(_.t,null,r.a.createElement(_.h,{xs:"12",md:"6"},a.confirmed?r.a.createElement(u.Mutation,{mutation:_e},function(t){return r.a.createElement($,{submit:function(r){var o=r.text,c=(new Date).toISOString(),i=O()(),s={__typename:"Todo",_id:i,text:o,complete:!1,createdAt:c,updatedAt:c};return"complete"!==n&&e.writeQuery({query:Qe,data:{__typename:"Query",viewer:Object(x.a)({__typename:"User"},a,{todos:[Object(x.a)({},s)].concat(Object(E.a)(a.todos)),todosCount:a.todosCount+1})}}),t({variables:{text:o},optimisticResponse:{__typename:"Mutation",addTodo:{__typename:"AddTodoResponse",todo:Object(x.a)({},s)}},update:function(e,t){var n=t.data.addTodo.todo,a=e.readQuery({query:Qe});e.writeQuery({query:Qe,data:{__typename:"Query",viewer:Object(x.a)({},a.viewer,{todos:a.viewer.todos.map(function(e){return e._id===i?Object(x.a)({},n):e})})}})}})}})}):r.a.createElement(_.a,{className:"text-center mx-auto mt-4 mb-xs-1 mb-md-5",color:"primary"},"Please confirm your account to Add Todo")),r.a.createElement(_.h,{xs:"12",md:"6"},r.a.createElement(F,{search:function(){var t=Object(w.a)(y.a.mark(function t(n){var a;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.text,e.writeData({data:{todosRefetching:!0}}),t.next=4,o({page:1,search:a,sort:"all"});case 4:e.writeData({data:{page:1,search:a,sort:"all",todosRefetching:!1}});case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),clearText:function(){e.writeData({data:{search:""}})}})))),r.a.createElement(ye,null),r.a.createElement(le,{subscribeToNewTodos:function(){return c({document:Oe,updateQuery:function(e,t){var n=t.subscriptionData;if(!n.data)return e;var r=n.data.todoAdded;return{__typename:"Query",viewer:Object(x.a)({},a,{__typename:"User",todos:[r].concat(Object(E.a)(a.todos)),todosCount:a.todosCount+1})}}})}}))})})})};function ke(){var e=Object(f.a)(["\n  query SignUpSuccess {\n    signUp @client {\n      success\n      email\n    }\n  }\n"]);return ke=function(){return e},e}function Se(){var e=Object(f.a)(["\n  mutation SignUp($email: String!, $password: String!) {\n    signUp(email: $email, password: $password) {\n      error\n      email\n    }\n  }\n"]);return Se=function(){return e},e}var Te=v()(Se()),Ne=v()(ke());var Ae=function(){return r.a.createElement(u.ApolloConsumer,null,function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(u.Query,{query:Ne},function(t){var n=t.data.signUp;return n.success&&r.a.createElement(_.a,{color:"success",className:"mx-auto text-center w-75 my-5",isOpen:n.success,toggle:function(){return e.writeData({data:{signUp:{__typename:"SignUpState",success:!1,email:""}}})}},r.a.createElement("h5",null,"Success! A confirmation link has been sent to ".concat(n.email)))}),r.a.createElement(u.Mutation,{mutation:Te,onCompleted:function(t){var n=t.signUp;null===n.error&&e.writeData({data:{signUp:{__typename:"SignUpState",success:!0,email:n.email}}})}},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.error?r.a.createElement("p",null,"An error occurred"):r.a.createElement(R,Object.assign({},t,{signUp:e}))}))})};var De=function(){return r.a.createElement("div",null,"Confirmation")};function Ue(){var e=Object(f.a)(["\n  mutation LogIn($email: String!, $password: String!) {\n    logIn(email: $email, password: $password) {\n      error {\n        email\n        password\n      }\n      token\n    }\n  }\n"]);return Ue=function(){return e},e}var Ie=v()(Ue()),Re=function(e){function t(){var e,n;Object(k.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(T.a)(this,(e=Object(N.a)(t)).call.apply(e,[this].concat(r)))).state={isOpen:!1},n.toggle=function(){n.setState(function(e){return{isOpen:!e.isOpen}})},n}return Object(A.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this,t=this.state.isOpen;return r.a.createElement(u.ApolloConsumer,null,function(n){return r.a.createElement(u.Query,{query:je},function(o){var c=o.data.viewerFetching;return r.a.createElement(u.Query,{query:Qe},function(o){var i=o.data.viewer;return r.a.createElement(_.q,{style:{borderBottom:"1px solid rgba(0,0,0,.125)"},color:"light",light:!0,expand:"lg"},r.a.createElement(_.j,{className:"my-2"},r.a.createElement(_.r,{href:"/"},"Glendon Philipp Baculio"),r.a.createElement(_.s,{onClick:e.toggle}),r.a.createElement(_.i,{isOpen:t,navbar:!0},r.a.createElement(_.o,{className:"ml-auto",navbar:!0},i?r.a.createElement(a.Fragment,null,r.a.createElement(_.p,null,i.email),r.a.createElement(_.p,null,r.a.createElement(_.b,{size:"sm",color:"primary",className:"ml-2",onClick:function(){n.writeQuery({query:Qe,data:{__typename:"User",viewer:null}}),localStorage.clear()}},"Logout"))):r.a.createElement(u.Mutation,{mutation:Ie,onCompleted:function(){var e=Object(w.a)(y.a.mark(function e(t){var n,a;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=t.logIn,a=n.token,null===n.error&&localStorage.setItem("token",a);case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.error)return r.a.createElement("p",null,"An error occurred");var a=function(){var e=Object(w.a)(y.a.mark(function e(t){return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n.writeData({data:{viewerFetching:!0}}),e.next=3,n.query({query:Qe,fetchPolicy:"network-only",context:{headers:{authorization:t}}});case 3:n.writeData({data:{viewerFetching:!1}});case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(_.p,{className:"login-container"},r.a.createElement(Q,Object.assign({viewerFetching:c,fetchUser:a},t,{logIn:e})))})))))})})})}}]),t}(a.Component);function qe(){var e=Object(f.a)(["\n  query Viewer($page: Int, $sort: String, $search: String ) {\n    __typename\n    viewer(page: $page, sort:$sort, search:$search) {\n      __typename\n      id\n      email\n      confirmed\n      todos {\n        __typename\n        ...Todo\n      }\n      todosCount\n    }\n  }\n  ","\n"]);return qe=function(){return e},e}var Qe=v()(qe(),ce.fragments.todo);var $e=function(){return r.a.createElement(u.Query,{query:Qe},function(e){var t=e.data.viewer,n=e.loading;return n?r.a.createElement(G,{loading:n}):r.a.createElement(a.Fragment,null,r.a.createElement(Re,null),t?r.a.createElement(h.a,{primary:!1,component:a.Fragment},r.a.createElement(Ce,{path:"/"})):r.a.createElement(h.a,{primary:!1,component:a.Fragment},r.a.createElement(Ae,{path:"/"}),r.a.createElement(De,{path:"/confirmation/:token"})))})},Fe=localStorage.getItem("token"),Me=new s.a({dataIdFromObject:function(e){switch(e.__typename){case"Todo":return e._id;default:return Object(s.b)(e)}}}),Pe=new l.a({uri:"http://localhost:8000/graphql",headers:{authorization:Fe}}),ze=new d.a({uri:"ws://localhost:8000/graphql",options:{reconnect:!0,connectionParams:function(){return{token:Fe}}}}),Le=Object(m.b)(function(e){var t=e.query,n=Object(p.a)(t),a=n.kind,r=n.operation;return"OperationDefinition"===a&&"subscription"===r},ze,Pe),Be=new i.default({cache:Me,link:Le,initializers:{isLoggedIn:function(){return!1},signUp:function(){return{__typename:"SignUpState",success:!1,email:""}},currentUser:function(){return{__typename:"CurrentUser",email:"",token:Fe,confirmed:!1,id:""}},pagination:function(){return{__typename:"Pagination",activePage:1,todosCount:0}},todosRefetching:function(){return!1},page:function(){return 1},sort:function(){return"all"},showRefresh:function(){return!1},viewerFetching:function(){return!1},search:function(){return""}}});c.a.render(r.a.createElement(u.ApolloProvider,{client:Be},r.a.createElement($e,{style:{height:"100%",width:"100%"}})),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[151,2,1]]]);
//# sourceMappingURL=main.7ce82537.chunk.js.map