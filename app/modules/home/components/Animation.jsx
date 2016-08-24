import React from 'react';
import ReactDOM from 'react-dom';
import { Score } from '/lib/collections.jsx';
import { Tracker } from 'meteor/tracker';

import Objects from './Objects.jsx';
import Arrow from '../../core/components/Arrow.jsx';
import PlayPause from './PlayPause.jsx';
import Continue from './Continue.jsx';

const T = i18n.createComponent();

export default class Animation extends React.Component {
    constructor(props){
        super(props);
        this.updateProgress = this.updateProgress.bind(this);
        this.plusScore = this.plusScore.bind(this);
        this.state = {
            subscription:{
                score:Meteor.subscribe("animationScore")
            },
            score:0
        }
    }

    componentDidMount(){
        this.scoreTracker = Tracker.autorun(()=>{
            if(this.state.subscription.score.ready())
                this.setState({"score":Score.find().fetch()[0].animationScore});
        });
        let mShare = require('mkg-share');
        new mShare('.shareContainer', {text:false, googleplus:false, reddit:false, pinterest:false, email:false, linkedin:false, phone:false, message:false});
        setTimeout(()=>{
            TweenLite.to(this.refs.animationMask, 0.3, {autoAlpha:0});
        },200);
    }

    componentWillUnmount(){
        this.scoreTracker.stop();
    }

    updateProgress(frame){
        this.props.updateTimeline(frame);
    }

    plusScore(){
        Meteor.call("updateScore", Score.find().fetch()[0]._id);
    }

    render() {

        return(
            <div className="animationContainer">

                <div className='animationLoadingMask' ref='animationMask'></div>

                <PlayPause />

                <Objects updateProgress={this.updateProgress} ref="objects" />

                <Continue />

                <img src='/images/anim_spacebar_fr.svg' className='spaceBarPress fr' alt='Press spacebar to pause' />
                <img src='/images/anim_spacebar_en.svg' className='spaceBarPress en' alt='Press spacebar to pause' />

                <div className="callToAction">
                    <p className='hook' ><T>common.animation.cta.p1</T></p>
                    <a href='/contact'><button><T>common.animation.cta.p2</T> <Arrow orientation='right' /></button></a>
                </div>
                <div className='love'>
                    <div className='loveContainer'>
                        <div className='plusOne' onClick={this.plusScore}>
                            {/*<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40.8px"
                                 height="22.7px" viewBox="0 0 40.8 22.7" enableBackground="new 0 0 40.8 22.7" xmlSpace="preserve">
                                <path className='round' fill="#220342" d="M11.3,22.2c-6,0-10.8-4.9-10.8-10.8S5.4,0.5,11.3,0.5h18.1c6,0,10.8,4.9,10.8,10.8s-4.9,10.8-10.8,10.8
                                    H11.3z"/>
                                <path className='outline' fill="#FFFFFF" d="M29.5,1c5.7,0,10.3,4.6,10.3,10.3c0,5.7-4.6,10.3-10.3,10.3H11.3C5.6,21.7,1,17,1,11.3C1,5.6,5.6,1,11.3,1
                                    H29.5 M29.5,0H11.3C5.1,0,0,5.1,0,11.3v0c0,6.2,5.1,11.3,11.3,11.3h18.1c6.2,0,11.3-5.1,11.3-11.3v0C40.8,5.1,35.7,0,29.5,0
                                    L29.5,0z"/>

                                <path fill="#FFFFFF" d="M12.2,12.1h2.7v-3h1v3h2.7V13h-2.7v3h-1v-3h-2.7V12.1z"/>
                                <path fill="#FFFFFF" d="M22.5,15h1.9V9.5c0-0.3,0-0.5,0-0.5h0c0,0-0.1,0.2-0.4,0.5l-0.8,0.8l-0.7-0.7l2-2h1.1V15h1.8v1h-4.9V15z"/>
                            </svg>*/}
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 width="26.054px" height="29.031px" viewBox="0 0 26.054 29.031" enableBackground="new 0 0 26.054 29.031" xmlSpace="preserve">
                                <path fill="#FFFFFF" d="M24.793,14.179c-1.043-1.004-2.516-1.121-3.535-1.121c-0.524,0-1.028,0.035-1.504,0.071
                                    c-0.039,0-0.109-0.02-0.172-0.04c-0.102-0.031-0.223-0.07-0.355-0.078c-0.489-0.101-0.864-0.203-1.219-0.484
                                    c-0.719-0.641-1.352-1.441-1.965-2.215l-0.441-0.551c-0.801-0.968-1.786-2.254-2.274-3.636C13.07,5.433,12.965,4.703,13,3.82
                                    c0.004-0.168,0.016-0.332,0.023-0.488c0.039-0.645,0.075-1.25-0.136-1.875C12.59,0.531,11.859,0,10.883,0
                                    c-0.656,0-1.348,0.25-1.871,0.668c-1.317,0.914-2.16,2.648-2.266,4.64C6.691,6.429,7.031,7.39,7.363,8.32
                                    c0.285,0.809,0.559,1.574,0.555,2.398c-0.004,1.254-1.086,1.602-2.617,1.957c-0.168,0.039-0.332,0.079-0.461,0.114
                                    c-0.176,0.031-0.356,0.058-0.535,0.09c-1.149,0.191-2.45,0.41-3.391,1.308c-0.711,0.703-1.051,1.871-0.863,2.969
                                    c0.137,0.793,0.527,1.445,1.09,1.832c-0.356,1.348,0.304,2.914,1.586,3.754c-0.125,0.609-0.008,1.297,0.332,1.941
                                    c0.379,0.719,0.98,1.285,1.656,1.551c0,1.234,0.844,2.309,2.168,2.687c0.371,0.075,0.769,0.11,1.222,0.11
                                    c0.672,0,1.348-0.078,1.997-0.152c0.218-0.024,0.433-0.047,0.683-0.075c0.383-0.078,0.781-0.129,1.184-0.179
                                    c0.832-0.11,1.687-0.219,2.461-0.551c0.629-0.281,1.183-0.684,1.715-1.074c0.175-0.129,0.347-0.254,0.523-0.375
                                    c0.172-0.125,0.348-0.286,0.527-0.457c0.309-0.289,0.625-0.59,0.934-0.649c0.273-0.051,0.535-0.082,0.789-0.109
                                    c0.281-0.031,0.555-0.059,0.824-0.114h0.133c0.285,0,0.594,0.016,0.918,0.036c0.367,0.023,0.75,0.047,1.129,0.047
                                    c0.93,0,2.098-0.122,2.851-1.047c1.11-1.317,1.27-3.325,1.278-5.293v-0.086C26.066,17.507,26.078,15.32,24.793,14.179L24.793,14.179
                                    z M20.57,22.093c-0.285,1.043-0.847,1.473-2.035,1.582c-0.371,0-0.824,0-1.25,0.262c-0.453,0.125-0.816,0.469-1.144,0.774
                                    c-0.125,0.121-0.25,0.238-0.368,0.328c-0.156,0.117-0.316,0.238-0.48,0.359c-0.492,0.375-1.004,0.762-1.457,0.984
                                    c-0.277,0.071-0.594,0.141-0.906,0.211l-0.61,0.137c-1.273,0.231-2.593,0.352-3.836,0.461c-0.418,0-0.851,0-1.285-0.113
                                    c-0.246-0.032-0.426-0.145-0.539-0.332c-0.156-0.258-0.172-0.645-0.043-0.985c0.102-0.234,0.082-0.484-0.051-0.691
                                    c-0.207-0.316-0.617-0.457-0.933-0.457H5.59l-0.039,0.012c-0.039,0.007-0.074,0.011-0.113,0.011c-0.258,0-0.524-0.215-0.711-0.574
                                    c-0.235-0.453-0.266-1.004-0.094-1.25c0.195-0.23,0.226-0.566,0.086-0.875c-0.129-0.273-0.36-0.449-0.614-0.48
                                    C3.5,21.25,3.109,20.871,2.941,20.339c-0.121-0.449-0.089-0.964,0.118-1.21c0.199-0.329,0.246-0.711,0.125-1.02
                                    c-0.102-0.25-0.309-0.434-0.618-0.52c-0.574-0.105-0.746-0.57-0.789-0.949c-0.093-0.695,0.438-1.222,0.938-1.472
                                    c0.769-0.43,1.707-0.582,2.617-0.731c0.488-0.082,0.988-0.164,1.465-0.285c1.633-0.422,2.801-1.699,2.914-3.172
                                    c0.078-1.082-0.262-2.078-0.594-3.039C8.836,7.129,8.574,6.359,8.551,5.55C8.527,4.769,8.754,3.906,9.188,3.082
                                    c0.417-0.649,1.117-1.348,1.671-1.348c0.032,0,0.059,0.004,0.082,0.004c0.344,0.051,0.332,0.703,0.293,1.308l-0.007,0.153
                                    c-0.051,0.996-0.071,1.836,0.156,2.808c0.316,1.321,1.07,2.395,1.793,3.43c0.156,0.227,0.316,0.453,0.476,0.688
                                    c0.684,0.98,1.551,2.05,2.493,3.074c0.179,0.215,0.375,0.453,0.613,0.613c0.062,0.117,0.148,0.18,0.23,0.211
                                    c0.586,0.449,1.215,0.711,2.008,0.84c0.578,0.109,1.074,0.199,1.324,0.625c0.504,0.887,0.516,2.109,0.528,3.09l0.004,0.23
                                    C20.867,19.847,20.859,21.043,20.57,22.093L20.57,22.093z M24.254,18.652l-0.004,0.383c0.008,1.508-0.086,3.051-0.82,4.117
                                    c-0.25,0.379-0.742,0.406-1.418,0.406h-0.071c0.379-0.773,0.528-1.672,0.621-2.488c0.157-1.481,0.141-2.934-0.05-4.313
                                    c-0.082-0.605-0.211-1.265-0.5-1.855c0.547,0.062,1.109,0.211,1.535,0.574C24.273,16.086,24.262,17.629,24.254,18.652L24.254,18.652
                                    z M24.254,18.652"/>
                            </svg>
                            <span className='lovedIt'><T>common.animation.like.p1</T></span>
                        </div>

                        <div className='score'>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 width="40.8px" height="26.6px" viewBox="0 0 40.8 26.6" enableBackground="new 0 0 40.8 26.6" xmlSpace="preserve">
                                <path fill="#FFFFFF" d="M40.8,11.3c0,3.1-1.3,6-3.3,8c-2.1,2.1-4.9,3.3-8,3.3H12.9C12,23.4,11,24,10.2,24.5
                                    c-0.6,0.3-1.2,0.6-1.7,0.8c-2.5,1.1-4.3,1.3-4.3,1.3V20C1.6,18,0,14.8,0,11.3c0-3.1,1.3-5.9,3.3-8C5.4,1.3,8.2,0,11.3,0h18.1
                                    C35.7,0,40.8,5.1,40.8,11.3z"/>
                                {/*<text transform="matrix(1 0 0 1 16.6475 16.0031)" fill="#200E38">0</text>*/}
                            </svg>
                            <span className='scoreNumber'>{this.state.score}</span>
                        </div>
                    </div>
                    <div className='shareContainer'>
                        <p><T>common.animation.like.p2</T></p>
                        {/*<a href='http://facebook.com' target='_blank'><div className='facebook'></div></a>
                        <a href='http://twitter.com' target='_blank'><div className='twitter'></div></a>*/}


                    </div>
                </div>
            </div>
        )
    }
}