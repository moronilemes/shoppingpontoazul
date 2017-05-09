<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Yoyo');

?>
    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
            
            'name'
        ],
    ]); 


?>
<ul>
<?php foreach ($categories as $category): ?>
    <li>
        <?= Html::encode("{$category->name}") ?>
    </li>
<?php endforeach; ?>
</ul>
