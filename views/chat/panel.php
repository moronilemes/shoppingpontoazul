<?php

use yii\helpers\Html;
use yii\grid\GridView;
use app\models\Store;
/* @var $this yii\web\View */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Chats');
$this->params['breadcrumbs'][] = $this->title;
$session = Yii::$app->session;

$thisStore = Store::findIdentity($session['store']);

?>
<div class="chat-index">
    <input type="hidden" value="<?=$thisStore->name?>" class="store-name" />
    <input type="hidden" value="<?=$thisStore->id?>" class="store-id" />

    <h1><?= Html::encode($this->title) ?></h1>
    <div class="col-sm-3">
      <ul class="nav nav-pills nav-stacked">
        <li role="presentation" class="active"><a href="#">Cliente 1</a></li>
        <li role="presentation"><a href="#">Cliente 2</a></li>
        <li role="presentation"><a href="#">Cliente 3</a></li>
      </ul>
    </div>
    <div class="col-sm-9">
      <div class="col-sm-12">
        <div class="chat-well well">

        </div>
        <div class="col-lg-12">
          <div class="input-group">
            <input type="text" class="form-control chat-input" placeholder="Digite sua mensagem">
            <span class="input-group-btn">
              <button class="btn btn-default chat-button" type="button">Enviar</button>
            </span>
          </div><!-- /input-group -->
        </div><!-- /.col-lg-6 -->
          <!--<div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with"
             data-auto-logout-link="false" data-use-continue-as="true"></div>-->
      </div>
    </div>


</div>
