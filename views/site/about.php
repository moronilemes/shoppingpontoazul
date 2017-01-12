<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'About';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        This is the About page. You may modify the following file to customize its content:
    </p>

    <code><?= __FILE__ ?></code>
    <p>
        <?php

    echo yii\base\Theme::className();
    
    
?>
    </p>
    <p><?php
        $salt ="sometext";
        $escapedPW="userpass";
        $saltedPW =  $escapedPW . $salt;
        $hashedPW = hash('sha256', $saltedPW);
        echo "<center>".$hashedPW."</center>";
    ?>
    </p>
</div>
