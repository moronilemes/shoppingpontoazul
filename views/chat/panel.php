<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Chats');
$this->params['breadcrumbs'][] = $this->title;
$session = Yii::$app->session;
?>
<div class="chat-index">

    <?php
        echo $session['store'];
        echo $session['user'];
        echo $session['role'];
    ?>
    
    <h1><?= Html::encode($this->title) ?></h1>
    <div class="col-sm-3">
        <ul class="nav nav-pills nav-stacked">
        <li role="presentation" class="active"><a href="#">Home</a></li>
        <li role="presentation"><a href="#">Profile</a></li>
        <li role="presentation"><a href="#">Messages</a></li>
    </ul>
    </div>
    <div class="col-sm-9">
        <div class="well well-lg">...</div>
        <div class="well well-sm">...</div>
    </div>
         
    
</div>
