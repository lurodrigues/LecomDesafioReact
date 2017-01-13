// --------------------------------------------------------------------------------------------------------------------
// --- IMPORTS --------------------------------------------------------------------------------------------------------

import React    from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './index.css';

import { 
    Tabs, Tab,   Navbar, Nav, NavItem,   Glyphicon, 
    ButtonToolbar, Button,   Panel,   Row, Col, 
    ListGroup, ListGroupItem 
} from 'react-bootstrap';


// --------------------------------------------------------------------------------------------------------------------
// --- DADOS FIXOS ----------------------------------------------------------------------------------------------------

const KNOWLEDGE   = {
    gridTop: [
        { name: 'course'    , num: 12,  title: 'Done courses'    , key: 2},
        { name: 'question'  , num: 27,  title: 'Asking questions', key: 4},
        { name: 'exam'      , num: 19,  title: 'Following exams' , key: 3}
    ],
    gridBottom: {
        titleGrafic: "Experience gained",
        titleFriend: "Friend activity",
        key: 7
    }
};
const OTHERS_TABS = [
    {key:2, title:"course"  },
    {key:3, title:"exam"    },
    {key:4, title:"Q&A"     },
    {key:5, title:"news"    },
    {key:6, title:"activity"},
    {key:7, title:"friends" }
];
const MENU_ITEM   = [
    { icon: 'glyphicon glyphicon-dashboard'      , key: 1, name: 'dashboard' },
    { icon: 'glyphicon glyphicon-th'             , key: 2, name: 'course'    },
    { icon: 'glyphicon glyphicon-time'           , key: 3, name: 'exam'      },
    { icon: 'glyphicon glyphicon-question-sign'  , key: 4, name: 'Q&A'       },
    { icon: 'glyphicon glyphicon-bullhorn'       , key: 5, name: 'news'      },
];


// --------------------------------------------------------------------------------------------------------------------
// --- VARIAVEIS AUXILIARES -------------------------------------------------------------------------------------------

/**
 * Guarda qual tab está aberta e
 * qual foi a ultima clicada antes dessa
 */
var tabKey = {
    old: 1,
    curr: 1
}


// --------------------------------------------------------------------------------------------------------------------
// --- FUNÇÕES AUXILIARES ---------------------------------------------------------------------------------------------

/**
 * Adiciona/Remove a classe 'active' dos elementos do menu
 * @param {number} i: Auxilia na manipulação dos botões do menu
 */
function changeClassElementMenu(i){
    var _old  = $(".list-group-item")[tabKey.curr-1];
    var _curr = $(".list-group-item")[i-1];
    
    tabKey.old = tabKey.curr;
    tabKey.curr = i;
    
    $(_old).removeClass('active')
    $(_curr).addClass('active')
}

/**
 * Manipula a tab visivel
 * @param {number} i: Auxilia na manipulação dos botões da tab
 */
function changeTabDashboard(i){
    
    var children     = $("#tab-dashboard").children(); //pega o contatiner das tabs
    
    var oldTab       = $( $(children[0]).children()[tabKey.old-1] ); //li(tab) que foi clicada anteriomente
    var currTab      = $( $(children[0]).children()[tabKey.curr-1]); //li(tab) atual
    
    var oldLink      = $( $(oldTab).children() );   //tag 'a' de dentro da li(tab) anterior
    var currLink     = $( $(currTab).children() );  //tag 'a' de dentro da li(tab) atual
    
    var oldContent   = $( $(children[1]).children()[tabKey.old-1] ); //container com as informações da li(tab) anterior
    var currContent  = $( $(children[1]).children()[tabKey.curr-1]); //container com as informações da li(tab) atual
    
    
    //Manipula o css por jquery para a tab mudar
    oldTab.removeClass('active');
    currTab.addClass('active');
    
    oldLink.attr('aria-selected', 'false').attr('tabindex', "-1");
    currLink.attr('aria-selected', 'true' ).attr('tabindex', null)
    
    oldContent.attr('aria-hidden'  , 'true' ).removeClass('active fade in').addClass('fade');
    currContent.attr('aria-hidden'  , 'false').removeClass('fade').addClass('active fade in');
}


// --------------------------------------------------------------------------------------------------------------------
// --- COMPONETES DO REACT --------------------------------------------------------------------------------------------

/** 
 * Componente: Menu Lateral
 */
var MenuContainer = React.createClass({
    
    changeTab: function (i){
        changeClassElementMenu(i);
        changeTabDashboard(i);
    },
    
    render: function(){
        var active = '';
        var _changeTab = this.changeTab;
        
        // Cria toda a lista de botões do container
        var _listGroupItem = this.props.menuItem.map(function (l) {
            active = (l.key === tabKey.curr) ? 'active' : '';
            return (
                <ListGroupItem href="#" key={l.key} className={active} onClick={_changeTab.bind(null, l.key)} > 
                    <Glyphicon glyph={l.icon}/> {l.name}
                </ListGroupItem>
            );
        });
        
        return (
            <div className='menu'>
                <Navbar>
                    <div className="title"> Hoang Nguyen </div>
                </Navbar>
                <ListGroup className="menu-item">
                    {_listGroupItem}
                </ListGroup>
            </div>
        );
    }
});

/** 
 * Componente: Containers 'Done Courses', 'Asking Questions' e 'Following Exams'
 */
var ColGridTop = React.createClass({
    changeTab: function (i){
        changeClassElementMenu(this.props.index);
        changeTabDashboard(this.props.index);
    },
    
    render: function(){
        
        // Cria o nome das classes que serão utilizadas abaixo
        var _classBox  = "box " + this.props.name;
        var _classList = "list "+ this.props.name;
        
        return(
            <Col xs={12} md={4} className="grid-container"> 
                <div className={_classBox} >    
                    <div className='num'>{this.props.num}</div> 
                    <div className='title'>{this.props.title}</div> 
                </div>
                <div className={_classList} >
                    <ListGroup>
                        <ListGroupItem href="#">Link 1</ListGroupItem>
                        <ListGroupItem href="#">Link 2</ListGroupItem>
                        <ListGroupItem href="#">Link 3</ListGroupItem>
                        <ListGroupItem href="#">Link 4</ListGroupItem>
                    </ListGroup>
                    <ButtonToolbar>
                        <Button bsStyle="link" onClick={this.changeTab}>
                            Show more <Glyphicon glyph="glyphicon glyphicon-chevron-down"/>
                        </Button>
                    </ButtonToolbar>
                </div>
            </Col>
        );
    }
});

/** 
 * Componente: Containers 'Experience Gained' e 'Friend Activity'
 */
var ColGridBottom = React.createClass({
    changeTab: function (i){
        changeClassElementMenu(this.props.index);
        changeTabDashboard(this.props.index);
    },
    
    render: function(){
        return(
            <Col xs={12} md={12}> 
                <Col xs={12} md={4} className="box-grafic">
                    <div className="title">{this.props.titleGrafic}</div>
                </Col>
                <Col xs={12} md={8} className="list box-friends">
                    <div className="title">{this.props.titleFriend}</div>
                    <ListGroup className="list question">
                        <ListGroupItem href="#">Link 1</ListGroupItem>
                        <ListGroupItem href="#">Link 2</ListGroupItem>
                        <ListGroupItem href="#">Link 3</ListGroupItem>
                        <ListGroupItem href="#">Link 4</ListGroupItem>
                    </ListGroup>
                    <ButtonToolbar>
                        <Button bsStyle="link" onClick={this.changeTab}>
                            Show more <Glyphicon glyph="glyphicon glyphicon-chevron-down"/>
                        </Button>
                    </ButtonToolbar>
                </Col>
            </Col>
        );
    }
});

/** 
 * Componente: Navbar do topo da pagina
 */
var DashNavbar = React.createClass({
    render: function(){
        return(
            <Navbar>
                <Nav>
                    <NavItem eventKey={1} href="#"> <Glyphicon glyph="glyphicon glyphicon-user"     /> </NavItem>
                    <NavItem eventKey={1} href="#"> <Glyphicon glyph="glyphicon glyphicon-comment"  /> </NavItem>
                    <NavItem eventKey={1} href="#"> <Glyphicon glyph="glyphicon glyphicon-calendar" /> </NavItem>
                </Nav>
            </Navbar>
        );
    }
});

/** 
 * Componente: Informações do usuráio
 */
var DashHeader = React.createClass({
    render: function(){
        return(
            <div className="header-dash">
                <p className="name">Hoang Nguyen</p>
                <p>Student <span className="dot">•</span> <a>Learn more</a> </p>
                <p> <Glyphicon glyph="glyphicon glyphicon-certificate"/> 8,782 exp</p>
            </div>
        );
    }
});

/** 
 * Componente: Tabs das pagina
 */
var DashTabs = React.createClass({
    
    changeDashTab: function (key){
        changeClassElementMenu(key);
        changeTabDashboard(key);
    },
    
    render: function(){
        
        // Cria todos os containers da primeira linha
        var _colGridTop = this.props.gridTop.map(function (c, i) {
            return <ColGridTop key={i} name={c.name} num={c.num} title={c.title} index={c.key}/>
        });
        
        // Cria a demais tabs
        var _tabs = this.props.othersTabs.map(function (t, i) {
            return (
                <Tab key={t.key} eventKey={t.key} title={t.title}>
                    <Panel> {t.title} </Panel>
                </Tab>
            );
        });
        
        return(
            <div className="tab-dash">
               
                <Tabs id="tab-dashboard" onSelect={this.changeDashTab}>
                    <Tab eventKey={1} key={1} title="Knowledge">
                        
                        <Row className="show-grid">
                            {_colGridTop}
                        </Row>
                        
                        <Row className="show-grid">
                            <ColGridBottom 
                                titleGrafic={this.props.gridBottom.titleGrafic} 
                                titleFriend={this.props.gridBottom.titleFriend} 
                                index={this.props.gridBottom.key}/>;
                        </Row>
                    </Tab>
                    
                    {_tabs}
                </Tabs>
            </div>
        );
    }
});


// --------------------------------------------------------------------------------------------------------------------
// --- COMPONETE PRINCIPAL---------------------------------------------------------------------------------------------

var MyComponent = React.createClass({
    render: function(){
        return (
            <div>
                <MenuContainer menuItem={this.props.menuItem}/>
                <div className='dashboard'>
                    <DashNavbar/>
                    <DashHeader/>
                    <DashTabs 
                        gridTop={this.props.knowledge.gridTop} 
                        gridBottom={this.props.knowledge.gridBottom}
                        othersTabs={this.props.othersTabs} />
                </div>
            </div>
        );
    }
});


// --------------------------------------------------------------------------------------------------------------------
// --- RENDERIZAÇÃO ---------------------------------------------------------------------------------------------------

ReactDOM.render(
    <MyComponent knowledge={KNOWLEDGE} othersTabs={OTHERS_TABS} menuItem={MENU_ITEM}/>,
    document.getElementById('root')
);
